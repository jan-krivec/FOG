//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract JournalNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Journal {
        string title;
        string description;
        string[] keywords;
        address author;
        address[] reviewers;
        address editor;
        mapping(address => int8) scores;
        mapping(address => string) comments;
        bool published;
        bool denied;
    }

    struct PublishedJournal {
        string title;
        string description;
        string[] keywords;
        address author;
        address[] reviewers;
        address editor;
    }

    mapping(uint256 => Journal) private _journals;
    uint256[] private _publishedJournals;

    constructor() ERC721("JournalNFT", "JournalNFT") {}

    function mintNFT(
        string memory title,
        string memory description,
        string[] memory keywords,
        address[] memory reviewers,
        address editor,
        string memory tokenURI
    ) public returns (uint256) {
        require(reviewers.length == 3, "There must be exactly 3 reviewers");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        Journal storage journal = _journals[newItemId];
        journal.title = title;
        journal.description = description;
        journal.keywords = keywords;
        journal.reviewers = reviewers;
        journal.editor = editor;
        journal.author = msg.sender;
        journal.published = false;
        journal.denied = false;

        for (uint8 i = 0; i < reviewers.length; i++) {
            journal.scores[reviewers[i]] = -1;
            journal.comments[reviewers[i]] = '';
        }

        return newItemId;
    }

    function voteOnJournal(uint256 journalId, int8 score) public {
        require(_exists(journalId), "Journal does not exist");
        Journal storage journal = _journals[journalId];

        bool isReviewer = false;
        for (uint8 i = 0; i < journal.reviewers.length; i++) {
            if (journal.reviewers[i] == msg.sender) {
                isReviewer = true;
            }
        }

        require(isReviewer, "Caller is not a reviewer");

        require(journal.scores[msg.sender] == -1, "Vote from reviewer already given");
        journal.scores[msg.sender] = score;

    }


    function publishJournal(uint256 journalId, bool approval) public {
        Journal storage journal = _journals[journalId];
        require(msg.sender == journal.editor, "Only editor can publish");
        require(!journal.published, "Journal already published");
        int8 finalScore = 0;

        for (uint8 i = 0; i < journal.reviewers.length; i++) {
            finalScore = finalScore + journal.scores[journal.reviewers[i]];
        }

        require(finalScore > 15, "Final score too low");

        if (approval) {
            journal.published = true;
            _publishedJournals.push(journalId);
        } else {
            journal.denied = true;
        }
    }

    function getPublishedJournals() public view returns (PublishedJournal[] memory) {
        uint256 totalPublished = _publishedJournals.length;
        PublishedJournal[] memory publishedJournals = new PublishedJournal[](totalPublished);

        for (uint256 i = 0; i < totalPublished; i++) {
            Journal storage j = _journals[_publishedJournals[i]];
            PublishedJournal memory p =  PublishedJournal(j.title, j.description, j.keywords, j.author, j.reviewers, j.editor);
            publishedJournals[i] = p;
        }

        return publishedJournals;
    }
}
