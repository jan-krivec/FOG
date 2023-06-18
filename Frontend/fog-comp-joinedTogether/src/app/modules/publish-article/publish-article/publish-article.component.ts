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
import { Location } from '@angular/common';
import { Author } from '../../../interfaces/author';

declare let window: any;

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: ['./publish-article.component.css'],
})
export class PublishArticleComponent {

  authors: Author[] = [
    {
      name: 'Klara Weaver',
      role: 'Author/Editor',
      location: 'New York',
      time: '9:30 AM',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus.',
      rating: 4.8,
      reviews: 1042,
      courses: 12,
      edits: 987,
      responseTime: 'very responsive',
      certificates: 'Adobe Photoshop, Adobe Illustrator, Adobe InDesign',
      profileLink: 'https://www.linkedin.com/in/klara-weaver-1a2b3c4d/',
      id: '0xE3BC6d953eCD62Ac8F13E32e8164648080BA6023'
    },
    {
      name: 'John Smith',
      role: 'Author',
      location: 'London',
      time: '2:00 PM',
      overview: 'I am a physicist specializing in quantum mechanics and theoretical physics. My research focuses on understanding the fundamental principles of the universe and exploring the possibilities of quantum computing.',
      rating: 4.5,
      reviews: 7896,
      courses: 8,
      edits: 215,
      responseTime: 'responsive',
      certificates: 'Ph.D. in Physics',
      profileLink: 'https://www.linkedin.com/in/john-smith-5e6f7g8h/',
      id: '0xA63F8C00d74214DDf920C23Cd3718cEe9A220afe'
    },
    {
      name: 'Emily Johnson',
      role: 'Editor',
      location: 'Los Angeles',
      time: '6:30 PM',
      overview: 'As an editor, I have a keen eye for detail and a passion for helping authors refine their work. I specialize in editing fiction novels, ensuring that the story flows smoothly and the characters come to life.',
      rating: 4.2,
      reviews: 2563,
      courses: 0,
      edits: 5632,
      responseTime: 'responsive',
      certificates: 'Editing Certificate',
      profileLink: 'https://www.linkedin.com/in/emily-johnson-9a8b7c6d/',
      id: '0xe9bC028b599824E7dE826dEDc76F91982e2E4e79'
    },
    {
      name: 'Michael Davis',
      role: 'Author/Editor',
      location: 'Paris',
      time: '10:00 AM',
      overview: 'My expertise lies in environmental science and sustainability. I am dedicated to finding innovative solutions to address climate change and promote a more sustainable future through my research and writing.',
      rating: 4.7,
      reviews: 4210,
      courses: 6,
      edits: 2154,
      responseTime: 'badly responsive',
      certificates: 'M.Sc. in Environmental Science',
      profileLink: 'https://www.linkedin.com/in/michael-davis-3b2a1c9d/',
      id: '0x7C56e5de7D9E0E20d0b3BC72E3eBDf816849734e'
    },
    {
      name: 'Sophia Wilson',
      role: 'Author',
      location: 'Tokyo',
      time: '4:30 PM',
      overview: 'I am a computer scientist specializing in artificial intelligence and machine learning. My research focuses on developing intelligent algorithms and systems to tackle complex real-world problems.',
      rating: 4.9,
      reviews: 9562,
      courses: 15,
      edits: 311,
      responseTime: 'very responsive',
      certificates: 'B.Sc. in Computer Science',
      profileLink: 'https://www.linkedin.com/in/sophia-wilson-7d6e5f4e/',
      id: '0x534b8781825b4410dae4738A76804287e073fb0B'
    },
    {
      name: 'Emma Thompson',
      role: 'Author',
      location: 'Sydney',
      time: '8:00 AM',
      overview: 'I am a marine biologist with a focus on coral reef conservation. My research aims to understand the impacts of climate change on coral ecosystems and develop strategies for their protection.',
      rating: 4.6,
      reviews: 3207,
      courses: 9,
      edits: 215,
      responseTime: 'responsive',
      certificates: 'M.Sc. in Marine Biology',
      profileLink: 'https://www.linkedin.com/in/emma-thompson-5a6b7c8d/',
      id: '0x598EB892c52f6C60a5C1e21DC7003E1a18a1cc36'
    },
    {
      name: 'Robert Anderson',
      role: 'Editor',
      location: 'Chicago',
      time: '3:30 PM',
      overview: 'With years of experience in the publishing industry, I provide meticulous editing services to ensure clarity, coherence, and grammatical correctness in written works. I specialize in academic and technical editing.',
      rating: 4.3,
      reviews: 1478,
      courses: 0,
      edits: 6254,
      responseTime: 'responsive',
      certificates: 'Editing Certificate',
      profileLink: 'https://www.linkedin.com/in/robert-anderson-1b2c3d4e/',
      id: '0xF75C86cD3E9b2f2Ec540c0392ec7EDDBd38a3D48'
    },
    {
      name: 'Isabella Garcia',
      role: 'Author/Editor',
      location: 'Barcelona',
      time: '11:30 AM',
      overview: 'As a social psychologist, I explore the complexities of human behavior and the influences of social interactions. My work focuses on understanding the factors that shape individual and group dynamics.',
      rating: 4.9,
      reviews: 5126,
      courses: 10,
      edits: 3269,
      responseTime: 'very responsive',
      certificates: 'Ph.D. in Social Psychology',
      profileLink: 'https://www.linkedin.com/in/isabella-garcia-2c3d4e5f/',
      id: '0x4C962738B33CA5048603a996e421931a79Ba7eeA'
    },
    {
      name: 'Oliver Martinez',
      role: 'Author',
      location: 'Berlin',
      time: '6:00 PM',
      overview: 'I am a historian specializing in ancient civilizations. My research delves into the mysteries of ancient Egypt, unravelling the secrets of pharaohs, pyramids, and the rich cultural heritage of the Nile Valley.',
      rating: 4.7,
      reviews: 2984,
      courses: 5,
      edits: 74,
      responseTime: 'responsive',
      certificates: 'B.A. in History',
      profileLink: 'https://www.linkedin.com/in/oliver-martinez-3d4e5f6g/',
      id: '0x08FdEC9ca567B85506f60Ea92eaa975516b2E997'
    },
    {
      name: 'Sophie Thompson',
      role: 'Editor',
      location: 'Toronto',
      time: '10:30 AM',
      overview: 'With a passion for storytelling, I specialize in developmental editing, helping authors shape their narratives and craft compelling characters. My goal is to empower writers to create impactful stories.',
      rating: 4.4,
      reviews: 2176,
      courses: 0,
      edits: 4591,
      responseTime: 'responsive',
      certificates: 'Editing Certificate',
      profileLink: 'https://www.linkedin.com/in/sophie-thompson-5f6g7h8i/',
      id: '0x1A5bE9ec529210a3d20cCE344bF39f56E6BeF808'
    }
  ];

  web3 : any;
  contract: any;
  contractAddress: string = '0xAc1FA82aD8cbDF908130e3D4cD799cE30B899d85';

  constructor(
    private articleContractService: ArticleContractService,
    private ipfsService: IpfsService,
    private http: HttpClient,
    private router: Router,
    private roleService: RoleService,
    private location: Location
  ) {

    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      this.retrieveWalletAddress();
    } else {
      console.log('Metamask not detected');
    }

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
  walletAddress!: string;


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

    // this.articleReviewers= await this.getRandomWallets(3,"30");

    const article = new ArticleDTO();

    article.articleId = Math.floor(Math.random()*1000000);
    article.title = this.title;
    console.log(this.title);
    article.description = this.description;
    article.keywords = this.keywords.split(',')//.map(keyword => keyword.trim());
    article.ipfsLink = cid;

    article.author = this.walletAddress; //tuki uporabi� verjetno neko getaccount funkcijo iz web3 da dobi� trenutnega userja?
    article.published = null;
    article.denied = null;
    //article.editor = this.getRandomWallets(1,"20")[0];
    //article.reviews = [ {reviewer: this.articleReviewers[0], score: null, comment: null},
    //                    {reviewer: this.articleReviewers[1], score: null, comment: null},
    //                    {reviewer: this.articleReviewers[2], score: null, comment: null},
    //                    {reviewer: this.articleReviewers[3], score: null, comment: null},];

    // Fetch them
    //const reviewers = [this.articleReviewers[0], this.articleReviewers[1], this.articleReviewers[2]];
    const reviewers = ["0x65B97D2ba4BD5F4eB6f010a4ECA056E2d20BFE93", "0xD66d94570443DA7252375bc1eb0e322A0a3fccCC", "0x4e45e81d104e3c7d16a6514dBcD5f9e11030888b"];

    // Fetch him
    // let editors = await this.getRandomWallets(1,"20");
    //let editor = editors[0];
    let editor = "0xC42aB325aDB10b29cb12cbc932f3B0dF07C9C089";

    await this.articleContractService.submitArticle(article, reviewers, editor);

    alert('Article submitted!');

    window.scrollTo(0, 0);
    window.location.reload();

    //this.router.navigate(['article-listing']);
  }

  async retrieveWalletAddress() {
    try {
      // Request access to the user's accounts
      await window.ethereum.enable();
  
      // Get the array of accounts
      const accounts = await this.web3.eth.getAccounts();
  
      // Get the first account from the array
      this.walletAddress = accounts[0];
      //this.articleId = accounts[0]; POTEM TO PODAŠ ZA ID
  
      console.log('Wallet Address:', this.walletAddress);
    } catch (error) {
      console.log('Error retrieving wallet address:', error);
    }
  }
}
