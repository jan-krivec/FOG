import { Injectable } from '@nestjs/common';
import { AbiItem } from 'web3-utils'
import {AlchemyWeb3, createAlchemyWeb3} from "@alch/alchemy-web3";
import {ConfigService} from "@nestjs/config";
import { ethers } from 'ethers';
import {journalContract} from '../../contracts/journal/journalNFT';


@Injectable()
export class JournalService {
    private API_URL: string = this.configService.get<string>('API_URL');
    private PUBLIC_KEY: string = this.configService.get<string>('ACCOUNT_PUBLIC_KEY');
    private PRIVATE_KEY: string = this.configService.get<string>('ACCOUNT_PRIVATE_KEY');
    private web3: AlchemyWeb3 = createAlchemyWeb3(this.API_URL);

    private nftContract = new this.web3.eth.Contract(journalContract.abi as AbiItem[], journalContract.contractAdress);


    constructor(private configService: ConfigService) {}


}
