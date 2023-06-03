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
  
  reviewer1 : ReviewData = {reviewer: "Reviewer1", score: 3, comment: "Comment1"};
  reviewer2 : ReviewData = {reviewer: "Reviewer2", score: 4, comment: "Comment2"};
  reviewer3 : ReviewData = {reviewer: "Reviewer3", score: 5, comment: "Comment3"};
  adressId! : string;	

  averageScore: number | null = null;

  articles : ArticleDTO[] = [
    {
      articleId: 1,
      title: "Title1",
      description: "Description1",
      keywords: ["keyword1", "keyword2", "keyword3"],
      ipfsLink: "ipfsLink1",
      author: "author1",
      published: null,
      denied: null,
      editor: "editor1",
      reviews: [this.reviewer1] },
    {
      articleId: 2,
      title: "Title2",
      description: "Description2",
      keywords: ["keyword1", "keyword2", "keyword3"],
      ipfsLink: "ipfsLink2",
      author: "author2",
      published: null,
      denied: null,
      editor: "editor2",
      reviews: [this.reviewer1, this.reviewer2, this.reviewer3]
    },
    {
      articleId: 3,
      title: "Title3",
      description: "Description3",
      keywords: ["keyword1", "keyword2", "keyword3"],
      ipfsLink: "ipfsLink3",
      author: "author3",
      published: null,
      denied: null,
      editor: "editor3",
      reviews: [this.reviewer3, this.reviewer2]
    },
    {
      articleId: 4,
      title: "Title4",
      description: "Description4",
      keywords: ["keyword1", "keyword2", "keyword3"],
      ipfsLink: "ipfsLink4",
      author: "author4",
      published: null,
      denied: null,
      editor: "editor4",
      reviews: [this.reviewer1, this.reviewer2, this.reviewer3]
    },
    {
      articleId: 5,
      title: "Title5",
      description: "Description5",
      keywords: ["keyword1", "keyword2", "keyword3"],
      ipfsLink: "ipfsLink5",
      author: "author5",
      published: null,
      denied: null,
      editor: "editor5",
      reviews: [this.reviewer2, this.reviewer3]
    },
    {
      articleId: 6,
      title: "Title6",
      description: "Description6",
      keywords: ["keyword1", "keyword2", "keyword3"],
      ipfsLink: "ipfsLink6",
      author: "author5",
      published: null,
      denied: null,
      editor: "editor6",
      reviews: [this.reviewer1, this.reviewer3]
    },
    

  ]

recommendedArticles: ArticleDTO[];
actualArticles!: ArticleDTO[];

nrOfStars : number = 5;

authorData: { author: Author; articles: Article[]; } | null = null;

constructor(private route: ActivatedRoute, private router: Router, private articleContractService: ArticleContractService) {
  this.recommendedArticles = this.getRandomArticles(4);

  //bi blo kao še kul če se nardi da niso isti čeprov zakaj pa ne,
  //recommended bi pomoje dalo glede na keywords popular pa z najvišjim ratingom??
}

ngOnInit() {
  this.route.params.subscribe(params => {
    this.adressId = params['id'];
  });

  //nevem al nardim tko al pač nevem najs komentar copilota, ampak ne, al tako kokr je v drugih article-listingih s promiseom, ugl actualArticles moram uporabit da po njih fora
  this.articleContractService.getAuthorsJournals(this.adressId)
  .then((articles: ArticleDTO[]) => {
    this.actualArticles = articles;
    // Additional code or operations with 'this.actualArticles'
  })
  .catch((error: any) => {
    console.log("o ne napaka: " + error)
  });

}

getRandomArticles(numArticles: number): ArticleDTO[] {
  const randomArticles: ArticleDTO[] = [];
  while (randomArticles.length < numArticles) {
    const randomIndex = Math.floor(Math.random() * this.articles.length);
    const randomArticle = this.articles[randomIndex];
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
          return sum + review.score;
        }
        return sum;
      }, 0);
      return totalScore / article.reviews.length;
    }
    return 0; // or any default value if there are no reviews
  }
}
