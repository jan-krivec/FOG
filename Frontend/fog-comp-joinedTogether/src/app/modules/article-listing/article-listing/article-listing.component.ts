import { Component, Inject } from '@angular/core';
import { Article } from '../../../interfaces/article';
import { Router } from '@angular/router';
import { ArticleDTO } from 'src/app/interfaces/article.model';
import { ReviewData } from 'src/app/interfaces/article.model';
import { ArticleContractService } from '../../../article.contract.service';

@Component({
  selector: 'app-article-listing',
  templateUrl: './article-listing.component.html',
  styleUrls: ['./article-listing.component.css']
})
export class ArticleListingComponent {



recommendedArticles!: ArticleDTO[];
popularArticles!: ArticleDTO[];

allArticles!: ArticleDTO[];

currentArticle: any;
currentIndex = 0;

nrOfStars : number = 5;

constructor(private router: Router, private articleContractService: ArticleContractService) {

  //bi blo kao še kul če se nardi da niso isti čeprov zakaj pa ne,
  //recommended bi pomoje dalo glede na keywords popular pa z najvišjim ratingom??
}

  async ngOnInit() {

    await this.loadData();

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.allArticles.length;
      this.currentArticle = this.allArticles[this.currentIndex];
    }, 10000);

    this.allArticles.sort((a, b) => {
      // Calculate the average score for each article
      const averageScoreA = this.calculateAverageScoreAll(a.reviews);
      const averageScoreB = this.calculateAverageScoreAll(b.reviews);

      // Sort in descending order
      return averageScoreB - averageScoreA;
    });


    //this.popularArticles = this.getRandomArticles(4);
    if(this.allArticles.length > 0) {
      this.currentArticle = this.allArticles[0];
      this.recommendedArticles = this.getRandomArticles(4);
    this.popularArticles = this.allArticles.slice(0, 4);
    }

  }

  async loadData(): Promise<void> {
    console.log("LOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    try {
      this.allArticles = await this.articleContractService.getPublishedJournals();
      console.log("ASdasdasd")
      console.log(this.allArticles);
    } catch (error) {
      // Handle any error that occurred during the data retrieval
      console.error(error);
    }
  }

  getRandomArticles(numArticles: number): ArticleDTO[] {
    const randomArticles: ArticleDTO[] = [];
    while (randomArticles.length < numArticles) {
      const randomIndex = Math.floor(Math.random() * this.allArticles.length);
      const randomArticle = this.allArticles[randomIndex];
      if (!randomArticles.includes(randomArticle)) {
        randomArticles.push(randomArticle);
      }
    }
    return randomArticles;
  }

  navigateToSelectedArticle(articleId: number | undefined | null) {
  if (articleId != null) {
    this.router.navigate(['article-details', articleId]);
  }
  }

  calculateAverageScore(article: ArticleDTO): number {
  if (article != null) {
    if (article.reviews && article.reviews.length > 0) {
      const totalScore = article.reviews.reduce((sum, review) => {
        if (review.score != null) {
          return sum + review.score;
        }
        return sum;
      }, 0);
      return totalScore / article.reviews.length;
    }
  }
    return 0; // or any default value if there are no reviews
  }

  calculateAverageScoreAll(reviews: ReviewData[] | undefined | null): number {
    if (!reviews || reviews.length === 0) {
      return 0;
    }

    const sum = reviews.reduce((total, review) => total + (review.score || 0), 0);
    return sum / reviews.length;
  }
}
