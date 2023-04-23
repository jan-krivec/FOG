import {Contract} from "ethers";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
require("dotenv").config()
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.ACCOUNT_PUBLIC_KEY;
const PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;

const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/Nfts/JournalNFT.sol/JournalNFT.json");

export class JournalContract {
    private contractAddress: string = "0x969F6F767d2c20B4a93Bf6088188D3E1E15D9fA2";
    private nftContract: Contract = new web3.eth.Contract(contract.abi, this.contractAddress);

    public async mintNFT(tokenURI: string) {
        const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

        //the transaction
        const tx = {
            'from': PUBLIC_KEY,
            'to': this.contractAddress,
            'nonce': nonce,
            'gas': 500000,
            'data': this.nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
        };

        return web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    }
}