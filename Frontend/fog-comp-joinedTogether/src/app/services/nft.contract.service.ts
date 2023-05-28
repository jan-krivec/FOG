import {Injectable} from "@angular/core";
import Web3 from 'web3';
import {JournalNFT} from "../../assets/contracts/nfts/JournalNFT";
import { ArticleDTO } from "../model/article.model";
import { IpfsService } from "./ipfs.service";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class NftContractService {
  web3: any;
  journalContract: any;
  journalNftAddress: string = '0x913dcD6b3fA3Af525243C2c2195921bA59CDD51A';
  roleNftAddress: string = '0x955A9492C441fE73F4E849a3764E10d19C07bb3d';

  constructor(private ipfsService: IpfsService) {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      window.ethereum.enable(); // Request user permission to connect to Metamask
      this.journalContract = new this.web3.eth.Contract(JournalNFT.abi, this.journalNftAddress);
    }
  }

  async mintJournalNft(data: ArticleDTO): Promise<boolean> {
    try {
      const metadata = JSON.stringify({
        "description": data.description,
        "image": "ipfs://QmRkYgYE4HdsXLLxpasRHTTAgpF8NtyZRECq3k9cgxizDY",
        "name": data.title,
        "properties": {
            "type": "journal",
            "origin": data.ipfsLink,
            "author": data.author,
            "reviewers": data.reviews,
            "editor": data.editor
        }
      });
  
      const cid = await this.ipfsService.addJSONtoIPFS(metadata);

      if(cid == null || cid == undefined || cid == '') {
        alert("Failed creating NFT!");
        return false;
      }
      const accounts = await this.web3.eth.getAccounts();
  
      this.journalContract.methods.mintNFT(cid).send({ from: accounts[0] });
  
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
