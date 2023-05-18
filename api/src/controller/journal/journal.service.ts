import { Injectable } from '@nestjs/common';
import {AlchemyWeb3, createAlchemyWeb3} from "@alch/alchemy-web3";
import {ConfigService} from "@nestjs/config";
import { ethers } from 'ethers';

const contract = require('../../contracts/journal/journalNFT.json')


@Injectable()
export class JournalService {
    private API_URL: string = this.configService.get<string>('API_URL');
    private PUBLIC_KEY: string = this.configService.get<string>('ACCOUNT_PUBLIC_KEY');
    private PRIVATE_KEY: string = this.configService.get<string>('ACCOUNT_PRIVATE_KEY');
    private web3: AlchemyWeb3 = createAlchemyWeb3(this.API_URL);
    private contract

    private contractAddress: string = "0x969F6F767d2c20B4a93Bf6088188D3E1E15D9fA2";
    private nftContract = new this.web3.eth.Contract(contract.abi, contract.contractAddress);


    constructor(private configService: ConfigService) {}


}
