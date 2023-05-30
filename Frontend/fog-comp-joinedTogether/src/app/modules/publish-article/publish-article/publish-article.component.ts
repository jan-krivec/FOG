import { Component } from '@angular/core';
import { ArticleContractService } from '../../../article.contract.service';
import { ArticleDTO } from '../../../interfaces/article.model';
import { ReviewData } from '../../../interfaces/article.model';
import { IpfsService } from 'src/app/services/ipfs.service';
import { TextRazor } from 'textrazor';


@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: ['./publish-article.component.css'],
})
export class PublishArticleComponent {
  isSelectedFirst = false;
  isSelectedSecond = false;

  checked = false;

  apiKey = '8a8496e5f9695ae68ba2254cbe2598c17c0cb8de356b7a0f19ed0f22';
  client = new TextRazor(this.apiKey);

  changed() {
    console.log(this.checked);
  }

  constructor(
    private articleContractService: ArticleContractService,
    private ipfsService: IpfsService
  ) {}

  toggleSelection(item: string) {
    if (item === 'first') {
      this.clearSelection();
      this.isSelectedFirst = !this.isSelectedFirst;
    } else if (item === 'second') {
      this.clearSelection();
      this.isSelectedSecond = !this.isSelectedSecond;
    }
  }

  clearSelection() {
    this.isSelectedFirst = false;
    this.isSelectedSecond = false;
  }

  collection = ['USA', 'Canada', 'UK'];

  files: File[] = [];

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

  async submitArticle() {
    if (!this.files) {
      alert('File not properly uploaded!');
      return;
    }

    const cid = await this.ipfsService.addFileToIPFS(this.files[0] as File);

    const article = new ArticleDTO();

    article.articleId = Math.floor(Math.random()*1000000); //tukaj rabi nardit da daje neke random cifre drugače al je to kul?
    article.title = this.files[0].name; //to je pomoje tisto ko maš name tko da iz name fielda vzameš vrednost
    article.description = 'Desc'; //to je v description input fieldu tko da to iz tam uzameš
    article.keywords = ['keyword1', 'keyword2', 'keyword3']; //tuki bi rabu še en input field za keywords? noro bi blo tuki nardit en ai model da pregleda keywordse
    article.ipfsLink = cid; //link do filea ki se ga download, nimam pojma kje je to shranjeno? probaj zvedet
    article.author = '0x123123123...' //tuki uporabiš verjetno neko getaccount funkcijo iz web3 da dobiš trenutnega userja?
    article.published = null; //ne daš se nič, to se spremeni potem
    article.denied = null; //isto
    article.editor = '0x123123123...' //tuki rabi isto nek getEditor funkcijo klicat da se določi kdo bo edital i guess?
    article.reviews = []; //tuki se doda ko se nafila naslednji del

    const review = new ReviewData();
    review.reviewer = '0x123123123...'; //tuki rabiš nek getReviewer funkcijo klicat da se določi kdo bo reviewal
    review.score = null; //tuki da kasneje reviewer
    review.comment = null; //tuki da kasneje reviewer
    

    // Fetch them
    const reviewers = ['0x79e2BEc427C0Cc9c5C2B4525680E163A15eE7fdE'];

    // Fetch him
    const editor = '0x79e2BEc427C0Cc9c5C2B4525680E163A15eE7fdE';

    this.articleContractService.submitArticle(article, reviewers, editor);
  }
}
