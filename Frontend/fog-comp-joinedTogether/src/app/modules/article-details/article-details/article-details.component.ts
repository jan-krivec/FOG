import { Component } from '@angular/core';
import { Article } from '../../../interfaces/article';
import { Review } from 'src/app/interfaces/review';
import { ActivatedRoute } from '@angular/router';
import { ArticleContractService } from 'src/app/article.contract.service';
import { ArticleDTO, ReviewData } from 'src/app/interfaces/article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})

export class ArticleDetailsComponent {

  reviewer1 : ReviewData = {reviewer: "Reviewer1", score: 3, comment: "Comment1"};
  reviewer2 : ReviewData = {reviewer: "Reviewer2", score: 4, comment: "Comment2"};
  reviewer3 : ReviewData = {reviewer: "Reviewer3", score: 5, comment: "Comment3"};
  reviewer4 : ReviewData = {reviewer: "Reviewer4", score: 5, comment: "Comment3"};
  
  relatedArticles2 : ArticleDTO[] = [
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

    reviews: Review[] = [
      {
        rating: 4.9,
        author: 'Klara Weaver',
        authorImage: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        review: 'Electric fish are some of the most unique creatures on the planet. With the ability to generate and sense electric fields, these fish have adapted to life in low-light or murky environments and use their electric sense to navigate, communicate, and hunt for prey.'
      }
    ];

    

    authorId! : number
    articleObject! : ArticleDTO;

    relatedArticles: ArticleDTO[];

    currentArticle: any;
    //currentArticleReviewes: any;
    articleReviews:ReviewData[] | null | undefined;

    currentArticleScore!: number;

    currentArticleReviewes: any = this.reviews[0];

    constructor(private route: ActivatedRoute, private articleContractService: ArticleContractService, private router: Router) {
      this.relatedArticles = this.getRandomArticles(4);
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.authorId = +params['id'];
      });

      this.currentArticle = this.relatedArticles2[this.authorId];
      this.currentArticleReviewes = this.reviews[0];

      this.articleContractService.getArticle(this.authorId).then((article) => {
        this.articleObject = article;
        console.log("Works!")
        console.log(this.articleObject)
        this.articleReviews = this.articleObject.reviews
        if (this.articleReviews){
        let sum = 0;
        let count = 0;

        this.articleReviews.forEach((review) => {
          if(review.score){
            sum += review.score;
            count++;
          }
        });

        this.currentArticleScore = sum / count;
        }
      }).catch((error) => {
        console.error("Error: ", error);
      });

      console.log(this.articleObject)
      this.articleReviews = [this.reviewer1, this.reviewer2, this.reviewer3, this.reviewer4];
    }

    //Poglej če je funkcija ki ti da random article
    getRandomArticles(numArticles: number): ArticleDTO[] {
      const randomArticles: ArticleDTO[] = [];
      while (randomArticles.length < numArticles) {
        const randomIndex = Math.floor(Math.random() * this.relatedArticles2.length);
        const randomArticle = this.relatedArticles2[randomIndex];
        if (!randomArticles.includes(randomArticle)) {
          randomArticles.push(randomArticle);
        }
      }
      return randomArticles;
    }

  public tabHeaderText : Object[] = [
    {text : 'Article Description'},
    {text : 'More from this author'}
  ];
  public tabContentText : string[] = [
      "DESCRIPTION TEXT",
      "MORE FROM THIS"
  ];

  navigateToSelectedArticle(articleId: number) {
    window.scrollTo(0, 0); // Scroll to the top of the page
    this.router.navigate(['article-details', articleId]).then(page => { window.location.reload() });
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

  goToProfile(authorId: string) {
    this.router.navigate(['authors-profile', authorId]);
  }
}
