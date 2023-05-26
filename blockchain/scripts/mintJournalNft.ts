const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
require("dotenv").config()

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.ACCOUNT_PUBLIC_KEY;
const PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;

const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/Nfts/JournalNFT.sol/JournalNFT.json");

// Change the address to the deployed contract address
const contractAddress = "0x969F6F767d2c20B4a93Bf6088188D3E1E15D9fA2";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI: string) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
    .then((signedTx: any) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err: any, hash: any) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err: any) => {
      console.log(" Promise failed:", err)
    })
}

mintNFT("ipfs://QmSiVM4uBM695UEvebMuE9VyTYYBooo1Vs3Cqs8KLcKAT7");