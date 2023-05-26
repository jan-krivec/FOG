import {Component, OnInit} from '@angular/core';
import {IpfsService} from "../../ipfs.service";
import {ArticleContractService} from "../article.contract.service";

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: ['./publish-article.component.css']
})
export class PublishArticleComponent{

  constructor(private articleContractService: ArticleContractService) {
  }

  async test() {
    await this.articleContractService.getAllReviewingJournals();
  }
}
