import {Injectable} from "@angular/core";
import Web3 from 'web3';
import {journalContract} from "../assets/contracts/journal/journalNFT"
import {ArticleDTO} from "./interfaces/article.model";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ArticleContractService {
  web3: any;
  contract: any;
  contractAddress: string = '0xc5E0DE65A3E428930d221644735FC0465FAe9cEd';

  constructor() {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      window.ethereum.enable(); // Request user permission to connect to Metamask
      this.contract = new this.web3.eth.Contract(journalContract.abi, this.contractAddress);

      const event = this.contract.events.JournalSubmitted({
        fromBlock: 'latest'
      });

      event.on('data', (eventData: any) => {
        console.log('JournalSubmitted event received:', eventData.returnValues);
      });
    } else {
      console.log('Metamask not detected. Please install Metamask extension.');
    }
  }

  async getAllReviewingArticles() {
    const articles: ArticleDTO[] = [];
    try {
      const result = await this.contract.methods.getAllReviewingJournals().call();
      for(let i=0; i<result.length; i++) {
        articles.push(this.mapArticleData(new ArticleDTO(), result[i]));
      }
      return articles;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async submitArticle(article: ArticleDTO, reviewers: string[], editor: string) {
    this.web3.eth.getAccounts().then((accounts: any) => {
      const account = accounts[0];
      console.log(account);
      this.contract.methods.submitJournal(
        article.title,
        article.description,
        article.ipfsLink,
        article.keywords,
        reviewers,
        editor
      ).send({ from: account })
        .on('transactionHash', (hash: any) => {
          console.log('Transaction hash:', hash);
        })
        .on('receipt', (receipt: any) => {
          console.log('Transaction receipt:', receipt);
        })
        .on('error', (error: any) => {
          console.error('Error:', error);
        });
    });
  }

  async getArticle(articleId: number): Promise<ArticleDTO> {
    let article = new ArticleDTO();
    try {
      const articleResult = await this.contract.methods.getJournal(articleId).call();
      article = this.mapArticleData(article, articleResult);

      const reviewResult = await this.contract.methods.getReviewData(articleId).call();
      article = this.mapReviewData(article, reviewResult);
      return article;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  mapArticleData(article: ArticleDTO, result: any): ArticleDTO {
      article.articleId = result[0];
      article.title = result[1];
      article.description = result[2];
      article.keywords = result[3];
      article.ipfsLink = result[4];
      article.author = result[5];
      article.published = result[6];
      article.denied = result[7];
      return article;
  }

  mapReviewData(article: ArticleDTO, result: any): ArticleDTO {
    article.editor = result[0];
    article.reviews = result[1];
    return article;
  }
}
