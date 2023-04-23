import { Injectable } from '@nestjs/common';
import {JournalContract} from '../../../../blockchain/methods/journalContract';

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
require("dotenv").config()
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.ACCOUNT_PUBLIC_KEY;
const PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;

const web3 = createAlchemyWeb3(API_URL);

@Injectable()
export class JournalService {
    private journalContract: JournalContract = new JournalContract();

    async mintJournal(tokenUri: string) {
        return this.journalContract.mintNFT(tokenUri).then((signedTx: any) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                (error, hash) => {
                    if (!error) {
                        return hash;
                    } else {
                        throw error;
                    }
                }
            )
        }).catch((error: any) => {
            throw error;
        });
    }
}
