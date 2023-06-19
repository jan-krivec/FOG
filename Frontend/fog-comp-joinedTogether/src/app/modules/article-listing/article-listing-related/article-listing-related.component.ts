import { Component } from '@angular/core';
import { Article } from '../../../interfaces/article';
import { Router } from '@angular/router';
import { ArticleDTO } from 'src/app/interfaces/article.model';
import { ReviewData } from 'src/app/interfaces/article.model';
import { ArticleContractService } from '../../../article.contract.service';

@Component({
  selector: 'app-article-listing-related',
  templateUrl: './article-listing-related.component.html',
  styleUrls: ['./article-listing-related.component.css']
})
export class ArticleListingRelatedComponent {

allRelatedArticles!: ArticleDTO[];
allArticles!: ArticleDTO[];

currentArticle: any = this.allArticles[0];

constructor(private router: Router, private articleContractService: ArticleContractService) {


}

  async ngOnInit() {

    await this.loadData();

    this.allRelatedArticles = this.getRandomArticles(Math.floor(this.allArticles.length/5));

  }

  async loadData(): Promise<void> {
    try {
      this.allArticles = await this.articleContractService.getPublishedJournals();
    } catch (error) {
      // Handle any error that occurred during the data retrieval
      console.error(error);
    }
  }

  getRandomArticles(numArticles: number): ArticleDTO[] {
    const randomArticles: ArticleDTO[] = [];
    while (randomArticles.length < numArticles) {
      const randomIndex = Math.floor(Math.random() * this.allArticles.length);
      const randomArticle = this.allRelatedArticles[randomIndex];
      if (!randomArticles.includes(randomArticle)) {
        randomArticles.push(randomArticle);
      }
    }
    return randomArticles;
  }

  navigateToSelectedArticle(articleId: number) {
    this.router.navigate(['article-details', articleId]);
  }

  calculateAverageScore(article: ArticleDTO): number {
    if (article.reviews && article.reviews.length > 0) {
      const totalScore = article.reviews.reduce((sum, review) => {
        if (review.score != null) {
          return Number(sum) + Number(review.score);
        }
        return sum;
      }, 0);
      return totalScore / article.reviews.length;
    }
    return 0; // or any default value if there are no reviews
  }
}
