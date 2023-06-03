import { Component } from '@angular/core';
import { ArticleContractService } from '../../../article.contract.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent {
  constructor(
    private articleContractService: ArticleContractService
  ) {}

  isSelectedFirst = false;
  isSelectedSecond = false;

  description!: string;

  ipfs!:string;

  async updateArticle(){
    this.articleContractService.journalRevision(Math.floor(Math.random()*1000000), this.ipfs);
  }

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

  files: File[] = [];

  onSelect(event : any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
