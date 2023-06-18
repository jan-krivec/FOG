import { Component } from '@angular/core';
import { ArticleContractService } from '../../../article.contract.service';
import { ArticleDTO } from '../../../interfaces/article.model';
import { ReviewData } from '../../../interfaces/article.model';
import { IpfsService } from 'src/app/services/ipfs.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: ['./publish-article.component.css'],
})
export class PublishArticleComponent {
  constructor(
    private articleContractService: ArticleContractService,
    private ipfsService: IpfsService,
    private http: HttpClient,
    private router: Router,
    private roleService: RoleService
  ) {}

  title!: string;
  description!: string;
  keywords!: string;

  articleReviewsID!: string;
  articleReviewers!: string[];

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

  getRandomWallets(numOfWallets: number, role: string){

    let walletIds: string[] = [];

    this.roleService.getRandomWallet(numOfWallets,role).subscribe((data) => {
      this.articleReviewsID = data;
      console.log(this.articleReviewsID);

      const regex = /"wallet_id": "([^"]+)"/g;
      const matches = [...data.matchAll(regex)];
      const walletIds = matches.map(match => match[1]);

      console.log(walletIds);
    });

    return walletIds;
  }


  async submitArticle() {
    if (!this.files) {
      alert('File not properly uploaded!');
      return;
    }

    const cid = await this.ipfsService.addFileToIPFS(this.files[0] as File);

    this.articleReviewers= this.getRandomWallets(4,"30");

    const article = new ArticleDTO();

    article.articleId = Math.floor(Math.random()*1000000); 
    article.title = this.title; 
    article.description = this.description; 
    article.keywords = this.keywords.split(',').map(keyword => keyword.trim()); 
    article.ipfsLink = cid;
    article.author = '0x123123123...' //tuki uporabi� verjetno neko getaccount funkcijo iz web3 da dobi� trenutnega userja?
    article.published = null; 
    article.denied = null; 
    //article.editor = this.getRandomWallets(1,"20")[0];
    //article.reviews = [ {reviewer: this.articleReviewers[0], score: null, comment: null},
    //                    {reviewer: this.articleReviewers[1], score: null, comment: null},
    //                    {reviewer: this.articleReviewers[2], score: null, comment: null},
    //                    {reviewer: this.articleReviewers[3], score: null, comment: null},];

    // Fetch them
    const reviewers = [this.articleReviewers[0], this.articleReviewers[1], this.articleReviewers[2], this.articleReviewers[3]];

    // Fetch him
    const editor = this.getRandomWallets(1,"20")[0];

    this.articleContractService.submitArticle(article, reviewers, editor);

    alert('Article submitted!');

    this.router.navigate(['article-listing']);
  }
}
