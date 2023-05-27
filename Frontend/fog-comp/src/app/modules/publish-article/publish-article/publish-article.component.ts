import { Component } from '@angular/core';
import {IpfsService} from "../../../../ipfs.service";
import {ArticleContractService} from "../../../article.contract.service";
import {ArticleDTO} from "../../../interfaces/article.model";

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: ['./publish-article.component.css']
})
export class PublishArticleComponent {
  isSelectedFirst = false;
  isSelectedSecond = false;

  checked = false;

  changed(){
    console.log(this.checked)
  }

  constructor( private articleContractService: ArticleContractService) { }

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

  onSelect(event : any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async test() {
    const articles = await this.articleContractService.getAllReviewingArticles();
    console.log(articles);
  }

  async publishArticle() {
    const article = new ArticleDTO();
    article.title = "Title 2";
    article.description = "Desc";
    article.ipfsLink = "ipfs://random-link";
    article.keywords = ["keyword1", "keyword2", "keyword3"];
    this.articleContractService.submitArticle(article, ["0x79e2BEc427C0Cc9c5C2B4525680E163A15eE7fdE"], "0x79e2BEc427C0Cc9c5C2B4525680E163A15eE7fdE")
  }
}
