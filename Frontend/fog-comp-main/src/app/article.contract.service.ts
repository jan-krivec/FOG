import {Injectable} from "@angular/core";
import Web3 from 'web3';
import {journalContract} from "../assets/contracts/journal/journalNFT";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ArticleContractService {
  web3: any;
  contract: any;
  contractAddress: string = '0x7E2882e56971b5BF577e8B0936Efe05f46B0D877';

  constructor() {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      window.ethereum.enable(); // Request user permission to connect to Metamask
      this.contract = new this.web3.eth.Contract(journalContract.abi, this.contractAddress);
    } else {
      console.log('Metamask not detected. Please install Metamask extension.');
    }
  }

  getAllReviewingJournals() {
    this.contract.methods.getAllReviewingJournals().call((error: any, result: any) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Value:', result);
      }
    });
  }
}
