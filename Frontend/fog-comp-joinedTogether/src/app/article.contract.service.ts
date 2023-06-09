import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { journalContract } from '../assets/contracts/journal/Journal';
import { ArticleDTO } from './interfaces/article.model';
import { environment } from '../../environment';


declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class ArticleContractService {
  web3: any;
  contract: any;
  contractAddress: string = environment.JOURNAL_CONTRACT_ADDRESS;

  constructor() {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      window.ethereum.enable(); // Request user permission to connect to Metamask
      this.contract = new this.web3.eth.Contract(
        journalContract.abi,
        this.contractAddress
      );

      const event = this.contract.events.JournalSubmitted({
        fromBlock: 'latest',
      });

      event.on('data', (eventData: any) => {
        console.log('JournalSubmitted event received:', eventData.returnValues);
      });

      const reviewEvent = this.contract.events.JournalReviewed({
        fromBlock: 'latest',
      });

      reviewEvent.on('data', (eventData: any) => {
        console.log('JournalReviewed event received:', eventData.returnValues);
      });

      const publishEvent = this.contract.events.JournalPublished({
        fromBlock: 'latest',
      });

      publishEvent.on('data', (eventData: any) => {
        console.log('JournalPublished event received:', eventData.returnValues);
      });

      const revisionEvent = this.contract.events.JournalRevision({
        fromBlock: 'latest',
      });

      revisionEvent.on('data', (eventData: any) => {
        console.log('JournalRevision event received:', eventData.returnValues);
      });

      const deniedEvent = this.contract.events.JournalDenied({
        fromBlock: 'latest',
      });

      deniedEvent.on('data', (eventData: any) => {
        console.log('JournalDenied event received:', eventData.returnValues);
      });
    } else {
      console.log('Metamask not detected. Please install Metamask extension.');
    }

  }

  // get all articles that are in the review process
  async getAllReviewingArticles() {
    const articles: ArticleDTO[] = [];
    try {
      const result = await this.contract.methods
        .getAllReviewingJournals()
        .call();
      for (let i = 0; i < result.length; i++) {
        articles.push(this.mapArticleData(new ArticleDTO(), result[i]));
      }
      return articles;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // get all articles that are published
  // !
  async getPublishedJournals() {
    const articles: ArticleDTO[] = [];
    try {
      const result = await this.contract.methods.getPublishedJournals().call();
      for (let i = 0; i < result.length; i++) {
        articles.push(this.mapArticleData(new ArticleDTO(), result[i]));
      }
      return articles;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // get articles by author adress -> s tem pokaži članke na author-profile!!!!!!
  // !
  async getAuthorsJournals(address: string) {
    const articles: ArticleDTO[] = [];
    try {
      const result = await this.contract.methods
        .getJournalsByAuthor(address)
        .call();
      for (let i = 0; i < result.length; i++) {
        articles.push(this.mapArticleData(new ArticleDTO(), result[i]));
      }
      return articles;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // get articles by editor adress
  // !
  async getJournalsByEditor() {
    const accounts = await this.web3.eth.getAccounts();
    const address = accounts[0];
    const articles: ArticleDTO[] = [];
    try {
      const result = await this.contract.methods
        .getJournalsByEditor(address)
        .call();
      for (let i = 0; i < result.length; i++) {
        articles.push(this.mapArticleData(new ArticleDTO(), result[i]));
      }
      return articles;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // get articles by reviewer adress
  // !
  async getJournalsByReviewer() {
    const accounts = await this.web3.eth.getAccounts();
    const address = accounts[0];
    const articles: ArticleDTO[] = [];
    try {
      const result = await this.contract.methods
        .getJournalsByReviewer(address)
        .call();
      for (let i = 0; i < result.length; i++) {
        articles.push(this.mapArticleData(new ArticleDTO(), result[i]));
      }
      return articles;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // review article with articleId
  //!
  async reviewJournal(articleId: number, score: number, comment: string) {
    const accounts = await this.web3.eth.getAccounts();
    await this.contract.methods
      .reviewJournal(articleId, score, comment)
      .send({ from: accounts[0] });
  }

  // editor approves or disaproves article
  // !
  async editorReview(articleId: number, approve: boolean) {
    const accounts = await this.web3.eth.getAccounts();
    await this.contract.methods
      .editorReview(articleId, approve)
      .send({ from: accounts[0] });
  }

  // author updates the article (new ipfs link)
  async journalRevision(articleId: number, ipfsLink: string) {
    const accounts = await this.web3.eth.getAccounts();
    await this.contract.methods
      .journalRevision(articleId, ipfsLink)
      .send({ from: accounts[0] });
  }

  // function for submiting the article by author
  //!
  async submitArticle(
    article: ArticleDTO,
    reviewers: string[],
    editor: string
  ) {
    const accounts = await this.web3.eth.getAccounts();
    console.log("Ta:")
    console.log(accounts)

    const account = accounts[0];

      console.log("Ta3:")
      console.log(this.contract.methods);
      this.contract.methods
        .submitJournal(
          article.title,
          article.description,
          article.ipfsLink,
          article.keywords,
          [...reviewers],
          editor
        )
        .send({ from: account })
        .on('transactionHash', (hash: any) => {
          console.log('Transaction hash:', hash);
        })
        .on('receipt', (receipt: any) => {
          console.log('Transaction receipt:', receipt);
        })
        .on('error', (error: any) => {
          console.error('Error:', error);
        });
  }

  // function for retrieving articcle by articleId -> ko klikneš na article!!!!!!!!!
  //!
  async getArticle(articleId: number): Promise<ArticleDTO> {
    let article = new ArticleDTO();
    try {
      const articleResult = await this.contract.methods
        .getJournal(articleId)
        .call();
      article = this.mapArticleData(article, articleResult);

      const reviewResult = await this.contract.methods
        .getReviewData(articleId)
        .call();
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
