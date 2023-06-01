import { Component } from '@angular/core';
import { ArticleDTO } from 'src/app/interfaces/article.model';
import { ArticleContractService } from '../../../article.contract.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-listing-edit',
  templateUrl: './article-listing-edit.component.html',
  styleUrls: ['./article-listing-edit.component.css']
})
export class ArticleListingEditComponent {

  articlesToEdit! : ArticleDTO[];
  addressId! : string;

  constructor(private articleContractService : ArticleContractService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.addressId = params['id'];
    });

    this.getEditArticles(this.addressId);

    console.log(this.articlesToEdit);
  }

  async getEditArticles(id: string) {
    this.articlesToEdit = await this.articleContractService.getJournalsByEditor(id);
  }

  navigateToSelectedArticle(articleId: number) {
    this.router.navigate(['article-details', articleId]);
  }

}
