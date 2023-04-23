import { ethers } from "hardhat";

async function main() {
  const Token = await ethers.getContractFactory("DapoToken");
  const DapoToken = await Token.deploy("DapoToken", "DAPOTKN", 100000000);

  await DapoToken.deployed();

  console.log(`DapoToken deployed to ${DapoToken.address}`);

  const faucet = await ethers.getContractFactory("Faucet");
  const Faucet = await faucet.deploy(DapoToken.address);

  await Faucet.deployed();

  console.log(`Faucet deployed to ${Faucet.address}`);

  await DapoToken.transfer(Faucet.address, ethers.utils.parseEther('1000000'));
  const faucetBalance = await Faucet.getBalance();

  console.log(`Faucet initial supply set to ${faucetBalance} DapoTokens`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
