import { Component } from '@angular/core';
import { ArticleDTO } from 'src/app/interfaces/article.model';
import { ArticleContractService } from '../../../article.contract.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ReviewData } from 'src/app/interfaces/article.model';

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

    this.getEditArticles(this.addressId); //potem uporabimo te valda

    console.log(this.articlesToEdit);
  }

  //dobimo tiste ki so za editat za ta address
  async getEditArticles(id: string) {
    this.articlesToEdit = await this.articleContractService.getJournalsByEditor(id);
  }

  navigateToSelectedArticle(articleId: number) {
    this.router.navigate(['article-details', articleId]);
  }


  //s tem mu določimo denied na false; da je sprejet
  acceptArticle(articleId: number) {
    let confirmed = window.confirm("Are you sure you want to accept this article?");
    
    if (confirmed) {
      this.articleContractService.editorReview(articleId, false);
      window.location.reload();
    } else {
      return;
    }
  }
  

  //obratno
  denyArticle(articleId: number) {
    let confirmed = window.confirm("Are you sure you want to deny this article?");

    if(confirmed) {
      this.articleContractService.editorReview(articleId, true);
      window.location.reload();
    }
    else {
      return;
    }
    
  }

  //dobimo average score ReveiwData.score propertija
  calculateAverageScore(article: ArticleDTO): number {
    if (article.reviews && article.reviews.length > 0) {
      const totalScore = article.reviews.reduce((sum, review) => {
        if (review.score != null) {
          return sum + review.score;
        }
        return sum;
      }, 0);
      return totalScore / article.reviews.length;
    }
    return 0; // or any default value if there are no reviews
  }

}
