import { ethers } from "hardhat";

async function main() {
  const JournalNFT = await ethers.getContractFactory("JournalNFT");

  const journalNFT = await JournalNFT.deploy();
  await journalNFT.deployed();

  console.log("JournalNFT Contract deployed to address:", journalNFT.address);

  const RoleNFT = await ethers.getContractFactory("RoleNFT");

  const roleNFT = await RoleNFT.deploy();
  await roleNFT.deployed();

  console.log("RoleNFT Contract deployed to address:", roleNFT.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error)
  process.exit(1)
});