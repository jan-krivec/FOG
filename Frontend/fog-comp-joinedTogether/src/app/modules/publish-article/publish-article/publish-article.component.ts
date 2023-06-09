import { Component } from '@angular/core';
import { ArticleContractService } from '../../../article.contract.service';
import { ArticleDTO } from '../../../interfaces/article.model';
import { ReviewData } from '../../../interfaces/article.model';
import { IpfsService } from 'src/app/services/ipfs.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { map } from 'rxjs/operators';
import { journalContract } from 'src/assets/contracts/journal/Journal';
import Web3 from 'web3';

declare let window: any;

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: ['./publish-article.component.css'],
})
export class PublishArticleComponent {

  web3 : any;
  contract: any;
  contractAddress: string = '0xAc1FA82aD8cbDF908130e3D4cD799cE30B899d85';

  constructor(
    private articleContractService: ArticleContractService,
    private ipfsService: IpfsService,
    private http: HttpClient,
    private router: Router,
    private roleService: RoleService
  ) {

    this.contractAddress = '0xE7864df258a66e36180Fffd0515D04264Ec211Dd'; // Assign a valid contract address here

    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      this.enableMetaMaskAndCreateContract();
    }
  }

  title!: string;
  description!: string;
  keywords!: string;

  articleReviewsID!: string;
  articleReviewers!: string[];
  
  
  accounts: string[] = [];
  currentUser!: string;

  files: File[] = [];

  async enableMetaMaskAndCreateContract() {
    try {
      await window.ethereum.enable(); // Request user permission to connect to MetaMask and wait for the enablement
      this.contract = new this.web3.eth.Contract(
        journalContract.abi,
        this.contractAddress
      );
    } catch (error) {
      console.error(error);
    }
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async test() {
    const articles =
      await this.articleContractService.getAllReviewingArticles();
    console.log(articles);
  }

  getRandomWallets(numOfWallets: number, role: string): Promise<string[]>{

    const myPromise = new Promise<string[]>((resolve, reject) => { 
      this.roleService.getRandomWallet(numOfWallets,role).subscribe((data) => {

        this.articleReviewsID = data;
        console.log(this.articleReviewsID);
  
        const regex = /"wallet_id": "([^"]+)"/g;
        const matches = [...data.matchAll(regex)];
        const walletIds = matches.map(match => match[1]);
  
        console.log(walletIds);
  
        resolve (walletIds);
        
      });
    }); 

    return myPromise;

    
  }


  async submitArticle() {
    if (!this.files) {
      alert('File not properly uploaded!');
      return;
    }

    const cid = "asdasdasdss" //await this.ipfsService.addFileToIPFS(this.files[0] as File);

    this.articleReviewers= await this.getRandomWallets(3,"30");

    const article = new ArticleDTO();

    article.articleId = Math.floor(Math.random()*1000000); 
    article.title = this.title; 
    console.log(this.title);
    article.description = this.description; 
    article.keywords = this.keywords.split(',')//.map(keyword => keyword.trim()); 
    article.ipfsLink = cid;

    //to get user:

    this.accounts = await this.web3.eth.getAccounts();
    this.currentUser = this.accounts[0];
    console.log("currentUser")
    console.log(this.currentUser)


    article.author = this.currentUser; //tuki uporabi� verjetno neko getaccount funkcijo iz web3 da dobi� trenutnega userja?
    article.published = null; 
    article.denied = null; 
    //article.editor = this.getRandomWallets(1,"20")[0];
    //article.reviews = [ {reviewer: this.articleReviewers[0], score: null, comment: null},
    //                    {reviewer: this.articleReviewers[1], score: null, comment: null},
    //                    {reviewer: this.articleReviewers[2], score: null, comment: null},
    //                    {reviewer: this.articleReviewers[3], score: null, comment: null},];

    // Fetch them
    //const reviewers = [this.articleReviewers[0], this.articleReviewers[1], this.articleReviewers[2]];
    const reviewers = ["0x08FdEC9ca567B85506f60Ea92eaa975516b2E997", "0x08FdEC9ca567B85506f60Ea92eaa975516b2E997", "0x08FdEC9ca567B85506f60Ea92eaa975516b2E997"];

    // Fetch him
    let editors = await this.getRandomWallets(1,"20");
    //let editor = editors[0];
    let editor = "0x08FdEC9ca567B85506f60Ea92eaa975516b2E997";

    this.articleContractService.submitArticle(article, reviewers, editor);

    alert('Article submitted!');

    //this.router.navigate(['article-listing']);
  }
}
