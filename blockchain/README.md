### How to start local blockchain

1. `npm install`
1. Run `docker-compose up -d`
   - start ganache local blockchain
   - start local block scanner on `http://localhost:80`

### How to deploy smart contracts

1. To compile smart contracts run `npx hardhat compile`
2. To deploy DapoToken & Faucet smart contracts run `npx hardhat run scripts/deployToken.ts --network ganache`

### How to run hardhat scripts

Sample script: `script/interact.ts`. To run script use following comman `npx hardhat run scripts/[script-name].ts --network ganache`

### Ganache accounts

1. Account
   - Public key: 0xE040f929FE0f9FE93116AA29a7e67965C3976A04
   - Private key: 0x232b057c8656c8057b759c16830e570e91d2dd966b10f21cea4cbfd20357a73d
2. Account
   - Public key: 0xb56d3CdBed2A5c7343AdbD57968074dD804e35Bf
   - Private key: 0xb6928ada7077aa880a338675a28e3912f9ffb4cb0c3c9674d4e38136bc7bdb56
3. Account
   - Public key: 0x8Da9301131B40fA5Ba5ceb4B39D7aE3faB40EaeE
   - Private key: 0x1de8205bbcc013db5005a711743f3ed09f98c44fc9df31967eedce3d5bd97d3c
