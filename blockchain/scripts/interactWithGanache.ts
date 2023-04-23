import { ethers } from "hardhat";

async function main() {
  // Set correct faucet address after deploying smart contracts
  const faucetAddress = "0x24EBAf007979FaC6aBabF7813307A0156C68b35A";
  const Faucet = await ethers.getContractAt("Faucet", faucetAddress);

  const balance = await Faucet.getBalance();

  console.log("Balance: ", balance);

  // Set correct token address after deploying smart contracts
  const tokenAddress = "0x9e33d8693b1E4701Ba50B54b294E794ED43B0c89";
  const DapoToken = await ethers.getContractAt("DapoToken", tokenAddress);

  // get accounts from the network
  const [owner, secondAccount, thirdAccount] = await ethers.getSigners();
  console.log(
    `Contracts Owner address: ${owner.address}, second acc: ${secondAccount.address}`
  );

  const address = await secondAccount.getAddress();

  const accBalance = await DapoToken.balanceOf(address);
  console.log("Account balance: ", accBalance);

  await DapoToken.transfer(address, 100);

  // Approve token transfer
  await DapoToken.approve(address, 200);

  const newAccountBallance = await DapoToken.balanceOf(address);
  console.log("New account balance: ", newAccountBallance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
