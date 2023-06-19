import { Component } from '@angular/core';
import { ArticleContractService } from '../../../article.contract.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent {
  constructor(
    private articleContractService: ArticleContractService,
    private route: ActivatedRoute,
  ) {}

  isSelectedFirst = false;
  isSelectedSecond = false;

  description!: string;

  ipfs :string = "krnekafora";
  adressId! : number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.adressId = params['id'];
    });
  }

  async updateArticle(){
    await this.articleContractService.journalRevision(this.adressId, this.ipfs);
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
