import { Contract } from "ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Journal contract", function () {
  let journalContract: Contract;

  let contractOwner: SignerWithAddress;
  let reviewers: SignerWithAddress[] = [];
  let editor: SignerWithAddress;

  const data = {
    title: "test title",
    desc: "test description",
    keywords: ["keyword1", "keyword2", "keyword3"],
    ipfsLink: "ipfs://random-link",
  };

  before(async () => {
    const [owner, address1, address2, address3] = await ethers.getSigners();
    const Journal = await ethers.getContractFactory("JournalContract");

    contractOwner = owner;
    reviewers.push(address1, address2);
    editor = address3;

    journalContract = await Journal.deploy();

    await journalContract.deployed();
  });

  describe("Submit journal", function () {
    it("Submit a journal", async function () {
      await expect(
        journalContract.submitJournal(
          data.title,
          data.desc,
          data.ipfsLink,
          data.keywords,
          reviewers.map(
            async (reviewer: SignerWithAddress) => await reviewer.getAddress()
          ),
          await editor.getAddress()
        )
      )
        .to.emit(journalContract, "JournalSubmitted")
        .withArgs(0, await contractOwner.getAddress(), data.title);
    });

    it("Submit multiple journals", async function () {
      await expect(
        journalContract.submitJournal(
          data.title + "1",
          data.desc + "1",
          data.ipfsLink,
          data.keywords,
          reviewers.map(
            async (reviewer: SignerWithAddress) => await reviewer.getAddress()
          ),
          await editor.getAddress()
        )
      )
        .to.emit(journalContract, "JournalSubmitted")
        .withArgs(1, await contractOwner.getAddress(), data.title + "1");

      await expect(
        journalContract.submitJournal(
          data.title + "2",
          data.desc + "2",
          data.ipfsLink,
          data.keywords,
          reviewers.map(
            async (reviewer: SignerWithAddress) => await reviewer.getAddress()
          ),
          await editor.getAddress()
        )
      )
        .to.emit(journalContract, "JournalSubmitted")
        .withArgs(2, await contractOwner.getAddress(), data.title + "2");
    });

    it("Journal with the same name already exists", async () => {
      await expect(
        journalContract.submitJournal(
          data.title,
          data.desc,
          data.ipfsLink,
          data.keywords,
          reviewers.map(
            async (reviewer: SignerWithAddress) => await reviewer.getAddress()
          ),
          await editor.getAddress()
        )
      ).to.be.revertedWith("Journal with the same name already exists");
    });
  });

  describe("Reviewing journal", async () => {
    it("Successfully review journal", async () => {
      await expect(
        journalContract
          .connect(reviewers[0])
          .reviewJournal(0, 1, "Test comment")
      )
        .to.emit(journalContract, "JournalReviewed")
        .withArgs(0, await reviewers[0].getAddress(), 1, "Test comment");
    });

    it("Reviewer not assigned to jornal", async () => {
      await expect(
        journalContract.reviewJournal(0, 1, "Test comment")
      ).to.be.revertedWith("Caller is not assigned as reviewer on journal");
    });

    it("Reviewer already reviewed journal", async () => {
      await expect(
        journalContract
          .connect(reviewers[0])
          .reviewJournal(0, -1, "Test comment")
      ).to.be.revertedWith("Vote from reviewer already given");
    });

    it("Wrong score sent to contract", async () => {
      await expect(
        journalContract
          .connect(reviewers[1])
          .reviewJournal(0, 20, "Test comment")
      ).to.be.revertedWith("Score can only be -1 or 1");
    });

    it("Journal does not exist", async () => {
      await expect(
        journalContract.reviewJournal(10, 1, data.title)
      ).to.be.revertedWith("Journal does not exist");
    });
  });

  describe("Publish journal", async () => {
    it("Successfully publish journal", async () => {
      await expect(journalContract.connect(editor).editorReview(0, true))
        .to.emit(journalContract, "JournalPublished")
        .withArgs(0, await editor.getAddress(), data.title);
    });

    it("Deny journal", async () => {
      await expect(journalContract.connect(editor).editorReview(1, false))
        .to.emit(journalContract, "JournalDenied")
        .withArgs(1, await editor.getAddress(), data.title + "1");

      const reviewData = await journalContract.getReviewData(1);

      for (const reviewerData of reviewData[1]) {
        expect(reviewerData.score).to.be.equal(0);
        expect(reviewerData.comment).to.be.equal("");
      }
    });

    it("Not all reviewers voted yet", async () => {
      await expect(journalContract.editorReview(0, true)).to.be.revertedWith(
        "All reviewers must vote before editor can review journal"
      );
    });

    it("Journal does not exist", async () => {
      await expect(journalContract.editorReview(100, true)).to.be.revertedWith(
        "Journal does not exist"
      );
    });

    it("Caller not editor on journal", async () => {
      await expect(journalContract.editorReview(0, true)).to.be.revertedWith(
        "Only editor can publish"
      );
    });

    it("Journal already published", async () => {
      await expect(
        journalContract.connect(editor).editorReview(0, true)
      ).to.be.revertedWith("Journal already published");
    });
  });

  describe("Journal revision", async () => {
    it("Successfull revision", async () => {
      await expect(journalContract.journalRevision(1, "ipfs://new-link"))
        .to.emit(journalContract, "JournalRevision")
        .withArgs(1, await contractOwner.getAddress(), data.title + "1");
    });

    it("Journal does not exist", async () => {
      await expect(
        journalContract.journalRevision(100, "ipfs://new-link")
      ).to.be.revertedWith("Journal does not exist");
    });

    it("Not author of journal", async () => {
      await expect(
        journalContract
          .connect(reviewers[1])
          .journalRevision(0, "ipfs://new-link")
      ).to.be.revertedWith("Only author can perform this action");
    });

    it("Journal must be in reviewing", async () => {
      await expect(
        journalContract.journalRevision(0, "ipfs://new-link")
      ).to.be.revertedWith(
        "Journal must be denied by editor in order to revise it"
      );
    });
  });

  describe("Journals return", async () => {
    it("Get all reviewing journals", async () => {
      const journalsData = await journalContract.getAllReviewingJournals();

      expect(journalsData).to.be.an("array").to.have.length(2);

      for (const journal of journalsData) {
        expect(journal.published).to.equal(false);
      }
    });

    it("Get journal review data", async () => {
      const journalData = await journalContract.getReviewData(0);

      expect(journalData).to.be.an("array").to.have.length(2);
      expect(journalData.editor).to.equal(await editor.getAddress());

      let index = 0;
      for (const reviewerData of journalData[1]) {
        expect(reviewerData.reviewer).to.equal(
          await reviewers[index++].getAddress()
        );
      }

      expect(journalData.editor).to.equal(await editor.getAddress());
    });

    it("Get published journals", async () => {
      const journalsData = await journalContract.getPublishedJournals();

      expect(journalsData).to.be.an("array").to.have.length(1);

      for (const journal of journalsData) {
        expect(journal.published).to.equal(true);
        expect(journal.denied).to.be.equal(false);
      }
    });

    it("Get editor journals", async () => {
      const journalsData = await journalContract.getJournalsByEditor(
        await editor.getAddress()
      );

      expect(journalsData).to.be.an("array").to.have.length(3);
    });

    it("Get reviewers journals", async () => {
      const journalsData = await journalContract.getJournalsByReviewer(
        await reviewers[0].getAddress()
      );

      expect(journalsData).to.be.an("array").to.have.length(3);
    });

    it("Get authors journals", async () => {
      const journalsData = await journalContract.getJournalsByAuthor(
        await contractOwner.getAddress()
      );

      expect(journalsData).to.be.an("array").to.have.length(3);
    });
  });
});
