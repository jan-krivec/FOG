import { Component } from '@angular/core';
import { ArticleContractService } from '../../../article.contract.service';
import { ArticleDTO } from '../../../interfaces/article.model';
import { IpfsService } from 'src/app/services/ipfs.service';

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: ['./publish-article.component.css'],
})
export class PublishArticleComponent {
  isSelectedFirst = false;
  isSelectedSecond = false;

  checked = false;

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
    article.title = this.files[0].name;
    article.description = 'Desc';
    article.ipfsLink = cid;
    article.keywords = ['keyword1', 'keyword2', 'keyword3'];

    // Fetch them
    const reviewers = ['0x79e2BEc427C0Cc9c5C2B4525680E163A15eE7fdE'];

    // Fetch him
    const editor = '0x79e2BEc427C0Cc9c5C2B4525680E163A15eE7fdE';

    this.articleContractService.submitArticle(article, reviewers, editor);
  }
}
