import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { JournalNFT } from '../../assets/contracts/nfts/JournalNft';
import { RoleNft } from '../../assets/contracts/nfts/RoleNft';
import { ArticleDTO } from '../interfaces/article.model';
import { IpfsService } from './ipfs.service';
import { environment } from '../../../environment.example';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class NftContractService {
  web3: any;

  journalNftContract: any;
  roleNftContract: any;

  journalNftAddress: string = '0x0551caF4Bd5A2754E2a64F4c1b8dE4a3Fc7B90aF' //environment.JOURNAL_NFT_CONTRACT_ADDRESS;
  roleNftAddress: string = '0xe22925676b5BE7450239EF0C7A55b60DeaC2c4dA' //environment.ROLE_NFT_CONTRACT_ADDRESS;

  constructor(private ipfsService: IpfsService) {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      window.ethereum.enable(); // Request user permission to connect to Metamask
      this.journalNftContract = new this.web3.eth.Contract(
        JournalNFT.abi,
        this.journalNftAddress
      );

      this.roleNftContract = new this.web3.eth.Contract(
        RoleNft.abi,
        this.roleNftAddress
      );
    }
  }

  // mint NFT to author after Journal is approved
  async mintJournalNft(data: ArticleDTO): Promise<boolean> {
    try {
      const metadata = JSON.stringify({
        description: data.description,
        image: environment.JOURNAL_NFT_IMAGE,
        name: data.title,
        properties: {
          type: 'journal',
          origin: data.ipfsLink,
          author: data.author,
          reviewers: data.reviews?.map(x => x.reviewer),
          editor: data.editor,
        },
      });

      const cid = await this.ipfsService.addJSONtoIPFS(metadata);

      if (cid == null || cid == undefined || cid == '') {
        alert('Failed creating NFT!');
        return false;
      }
      const accounts = await this.web3.eth.getAccounts();

      this.journalNftContract.methods.mintNFT(cid, data.author).send({ from: accounts[0] });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }


  // mint NFT to author after Journal is approved
  async buyJournalNft(data: ArticleDTO): Promise<boolean> {
    try {
      const metadata = JSON.stringify({
        description: data.description,
        image: environment.JOURNAL_NFT_IMAGE,
        name: data.title,
        properties: {
          type: 'journal',
          origin: data.ipfsLink,
          author: data.author,
          reviewers: data.reviews?.map(x => x.reviewer),
          editor: data.editor,
        },
      });

      const cid = await this.ipfsService.addJSONtoIPFS(metadata);

      if (cid == null || cid == undefined || cid == '') {
        alert('Failed creating NFT!');
        return false;
      }
      const accounts = await this.web3.eth.getAccounts();

      const etherValue = this.web3.utils.toWei('1', 'ether');
      this.journalNftContract.methods.buyNFT(data.ipfsLink, data.author).send({ from: accounts[0], value: etherValue });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //mint NFT for the role to user
  async mintRoleNft(
    name: string,
    desc: string,
    role: string,
    address: string
  ): Promise<boolean> {
    try {
      const metadata = JSON.stringify({
        description: desc,
        image: environment.ROLE_NFT_IMAGE,
        name: name,
        properties: {
          address: address,
          role: role,
        },
      });

      const cid = await this.ipfsService.addJSONtoIPFS(metadata);

      if (cid == null || cid == undefined || cid == '') {
        alert('Failed creating NFT!');
        return false;
      }
      const accounts = await this.web3.eth.getAccounts();

      this.roleNftContract.methods.mintNFT(cid).send({ from: accounts[0] });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
