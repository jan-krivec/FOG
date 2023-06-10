import { Component } from '@angular/core';
import { ArticleDTO } from 'src/app/interfaces/article.model';
import { ArticleContractService } from '../../../article.contract.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReviewData } from 'src/app/interfaces/article.model';
import { PopupComponent } from 'src/app/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-article-listing-review',
  templateUrl: './article-listing-review.component.html',
  styleUrls: ['./article-listing-review.component.css']
})
export class ArticleListingReviewComponent {

  articlesToReview! : ArticleDTO[];
  addressId! : string;

  averageScore: number | null = null;


  constructor(private articleContractService : ArticleContractService, private route: ActivatedRoute, private router : Router,
              private location: Location, public dialog: MatDialog) { }

  async ngOnInit() {

    this.route.params.subscribe(params => {
      this.addressId = params['id'];
    });

    await this.getReviewingArticles(this.addressId); //!!!!potem uporabimo te

    console.log("ASDASDAS")
    console.log(this.articlesToReview);

  }

  
  //dobimo kere moramo reviewat s tem addressom
  async getReviewingArticles(id: string) {
    this.articlesToReview = await this.articleContractService.getJournalsByReviewer(id); //!!!!potem uporabimo te
  }

  //gremo na article-details za tega
  navigateToSelectedArticle(articleId: number) {
    this.router.navigate(['article-details', articleId]);
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

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '255px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.articleContractService.reviewJournal(parseInt(this.addressId), result.score, result.comment);
        console.log('The dialog was closed');
        console.log('Result:', result);
      }
    });
  }

}
