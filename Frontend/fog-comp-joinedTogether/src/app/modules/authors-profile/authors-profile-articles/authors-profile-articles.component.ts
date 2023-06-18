import { Component } from '@angular/core';
import { Article } from '../../../interfaces/article';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/interfaces/author';
import { ArticleContractService } from '../../../article.contract.service';
import { ReviewData } from 'src/app/interfaces/article.model';
import { ArticleDTO } from 'src/app/interfaces/article.model';

@Component({
  selector: 'app-authors-profile-articles',
  templateUrl: './authors-profile-articles.component.html',
  styleUrls: ['./authors-profile-articles.component.css']
})
export class AuthorsProfileArticlesComponent {
  
  adressId! : string;	

  averageScore: number | null = null;

recommendedArticles!: ArticleDTO[];
actualArticles!: ArticleDTO[];

nrOfStars : number = 5;

authorData: { author: Author; articles: Article[]; } | null = null;

constructor(private route: ActivatedRoute, private router: Router, private articleContractService: ArticleContractService) {
  
}

async ngOnInit() {
  this.route.params.subscribe(params => {
    this.adressId = params['id'];
  });

  await this.getTheJournal();

  if (this.actualArticles.length >= 4) {
    this.recommendedArticles = this.getRandomArticles(4);
  }
  else {
    this.recommendedArticles = this.getRandomArticles(this.actualArticles.length);
  }
}

async getTheJournal() {
  //te al se da tiste articles ku so usi ker itk so fejk tej profili?
  await this.articleContractService.getAuthorsJournals(this.adressId)
  .then((articles: ArticleDTO[]) => {
    this.actualArticles = articles;
  })
  .catch((error: any) => {
    console.log("o ne napaka: " + error)
  });
}

getRandomArticles(numArticles: number): ArticleDTO[] {
  const randomArticles: ArticleDTO[] = [];


  while (randomArticles.length < numArticles) {
    const randomIndex = Math.floor(Math.random() * this.actualArticles.length);
    const randomArticle = this.actualArticles[randomIndex];
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

  //tuki gremo na edit-article da se mu dodeli use parametre ki jih rabi 
  navigateToEditArticle(articleId: number) {
    this.router.navigate(['edit-article', articleId]);
    console.log(articleId)
  }
}
