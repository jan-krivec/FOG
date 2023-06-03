import { Component } from '@angular/core';
import { ArticleContractService } from '../../../article.contract.service';
import { ArticleDTO } from '../../../interfaces/article.model';
import { ReviewData } from '../../../interfaces/article.model';
import { IpfsService } from 'src/app/services/ipfs.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: ['./publish-article.component.css'],
})
export class PublishArticleComponent {
  constructor(
    private articleContractService: ArticleContractService,
    private ipfsService: IpfsService,
    private http: HttpClient
  ) {}

  title!: string;
  description!: string;
  keywords!: string;

  articleReviewsID!: string[];

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

  getRandomWallets(numOfWallets: string, role: string){
    return this.http.get<any[]>('http://64.226.85.227/get_random_wallets/', { params: { role: role, number: numOfWallets } })
  }

  async submitArticle() {
    if (!this.files) {
      alert('File not properly uploaded!');
      return;
    }

    const cid = await this.ipfsService.addFileToIPFS(this.files[0] as File);

    //this.articleReviewsID = this.getRandomWallets("30","4");

    const article = new ArticleDTO();

    article.articleId = Math.floor(Math.random()*1000000); //tukaj rabi nardit da daje neke random cifre drugace al je to kul?
    article.title = this.title; //to je pomoje tisto ko ma� name tko da iz name fielda vzame� vrednost
    article.description = this.description; //to je v description input fieldu tko da to iz tam uzame�
    article.keywords = this.keywords.split(',').map(keyword => keyword.trim()); //tuki bi rabu �e en input field za keywords? noro bi blo tuki nardit en ai model da pregleda keywordse
    article.ipfsLink = cid; //link do filea ki se ga download, nimam pojma kje je to shranjeno? probaj zvedet
    article.author = '0x123123123...' //tuki uporabi� verjetno neko getaccount funkcijo iz web3 da dobi� trenutnega userja?
    article.published = null; //ne da� se nic, to se spremeni potem
    article.denied = null; //isto
    article.editor = ""; //this.getRandomWallets("20","1"); //tuki rabi isto nek getEditor funkcijo klicat da se doloci kdo bo edital i guess?
    article.reviews = [ {reviewer: this.articleReviewsID[0], score: null, comment: null},
                        {reviewer: this.articleReviewsID[1], score: null, comment: null},
                        {reviewer: this.articleReviewsID[2], score: null, comment: null},
                        {reviewer: this.articleReviewsID[3], score: null, comment: null},]; //tuki se doda ko se nafila naslednji del

    //http://64.226.85.227:8000/get_random_wallets/?role=30&number=4 <- klic za pridobit 4 reviewerjev
    //http://64.226.85.227:8000/get_random_wallets/?role=20&number=5 <- klic za pridobit 5 editorjev

    const review = new ReviewData();
    review.reviewer = '0x123123123...'; //tuki rabi� nek getReviewer funkcijo klicat da se doloci kdo bo reviewal
    review.score = null; //tuki da kasneje reviewer
    review.comment = null; //tuki da kasneje reviewer

    // Fetch them
    const reviewers = ['0x79e2BEc427C0Cc9c5C2B4525680E163A15eE7fdE'];

    // Fetch him
    const editor = '0x79e2BEc427C0Cc9c5C2B4525680E163A15eE7fdE';

    this.articleContractService.submitArticle(article, reviewers, editor);
  }
}
