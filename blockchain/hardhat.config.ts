import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ganache: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: `${process.env.API_URL}`,
      accounts: [`${process.env.ACCOUNT_PRIVATE_KEY}`]
    }
  },
};

export default config;
