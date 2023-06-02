import { Component } from '@angular/core';
import { ArticleDTO } from 'src/app/interfaces/article.model';
import { ArticleContractService } from '../../../article.contract.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-listing-review',
  templateUrl: './article-listing-review.component.html',
  styleUrls: ['./article-listing-review.component.css']
})
export class ArticleListingReviewComponent {

  articlesToReview! : ArticleDTO[];
  addressId! : string;

  aritclesToReview = [];

  constructor(private articleContractService : ArticleContractService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.addressId = params['id'];
    });

    this.getReviewingArticles(this.addressId);

    console.log("ASDASDAS")
    console.log(this.articlesToReview);


  }

  async getReviewingArticles(id: string) {
    this.articlesToReview = await this.articleContractService.getJournalsByReviewer(id);
  }

  navigateToSelectedArticle(articleId: number) {
    this.router.navigate(['article-details', articleId]);
  }
}
