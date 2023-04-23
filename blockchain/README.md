### Using Sepolia testnet

1. Create a new account on Alchemy (https.//alchemy.com)
2. Create new app and set it to Sepolia testnet
3. Copy the app API_URL to .env
4. Fill your test account Public & private key in .env

If using sepoliaa testnet, the blockscanner is located on `https://sepolia.etherscan.io/`. To get ETH for testing go to `https://sepoliafaucet.com/`.

### Using local blockchain

1. Run `docker-compose up -d`
   - starts ganache local blockchain
   - starts local block scanner on `http://localhost:80`
2. Fill your test account Public & private key in .env

### How to deploy smart contracts

1. To compile smart contracts run `npx hardhat compile`
2. To deploy DapoToken & Faucet smart contracts run `npx hardhat run scripts/deployToken.ts --network [ganache/sepolia]`
3. To deploy NFT contracts run `npx hardhat run scripts/deployNFT.ts --network [ganache/sepolia]`

### How to run hardhat scripts

To run a script use following command `npx hardhat run scripts/[script-name].ts --network [ganace/sepolia]`. If using ganache network, the container for it must be running.
