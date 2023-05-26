import { ethers } from "hardhat";

async function main() {
  const JournalContract = await ethers.getContractFactory("JournalContract");
  const Journal = await JournalContract.deploy();

  await Journal.deployed();

  console.log(`Journaldeployed to ${Journal.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
