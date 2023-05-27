import {Injectable} from "@angular/core";
import Web3 from 'web3';
import {journalContract} from "../assets/contracts/journal/journalNFT";
import {ArticleDTO} from "./model/article.model";

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

  async getAllReviewingJournals() {
    this.contract.methods.getAllReviewingJournals().call((error: any, result: any) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Value:', result);
      }
    });
  }

  async submitArticle(article: ArticleDTO, reviewers: string[], editor: string) {
    this.contract.methods.submitJournal(
      article.title,
      article.description,
      article.ipfsLink,
      article.keywords,
      reviewers,
      editor
    )
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
