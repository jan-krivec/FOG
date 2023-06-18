import { Component } from '@angular/core';
import { Article } from '../../../interfaces/article';
import { Review } from 'src/app/interfaces/review';
import { ActivatedRoute } from '@angular/router';
import { ArticleContractService } from 'src/app/article.contract.service';
import { ArticleDTO, ReviewData } from 'src/app/interfaces/article.model';
import { Router } from '@angular/router';
import { Author } from 'src/app/interfaces/author';

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

    authors: Author[] = [
      {
        name: 'Klara Weaver',
        role: 'Author',
        location: 'New York',
        time: '9:30 AM',
        overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus.',
        rating: 4.8,
        reviews: 1042,
        courses: 12,
        edits: 987,
        responseTime: 'very responsive',
        certificates: 'Adobe Photoshop, Adobe Illustrator, Adobe InDesign',
        profileLink: 'https://www.linkedin.com/in/klara-weaver-1a2b3c4d/',
        id: '0xafed43358989Ddc1A44076f0Ecbd433F1E13c9fA'
      },
      {
        name: 'John Smith',
        role: 'Editor',
        location: 'London',
        time: '2:00 PM',
        overview: 'I am a physicist specializing in quantum mechanics and theoretical physics. My research focuses on understanding the fundamental principles of the universe and exploring the possibilities of quantum computing.',
        rating: 4.5,
        reviews: 7896,
        courses: 8,
        edits: 215,
        responseTime: 'responsive',
        certificates: 'Ph.D. in Physics',
        profileLink: 'https://www.linkedin.com/in/john-smith-5e6f7g8h/',
        id: '0xC42aB325aDB10b29cb12cbc932f3B0dF07C9C089'
      },
      {
        name: 'Emily Johnson',
        role: 'Editor',
        location: 'Los Angeles',
        time: '6:30 PM',
        overview: 'As an editor, I have a keen eye for detail and a passion for helping authors refine their work. I specialize in editing fiction novels, ensuring that the story flows smoothly and the characters come to life.',
        rating: 4.2,
        reviews: 2563,
        courses: 0,
        edits: 5632,
        responseTime: 'responsive',
        certificates: 'Editing Certificate',
        profileLink: 'https://www.linkedin.com/in/emily-johnson-9a8b7c6d/',
        id: '0x4e45e81d104e3c7d16a6514dBcD5f9e11030888b'
      },
      {
        name: 'Michael Davis',
        role: 'Author/Editor',
        location: 'Paris',
        time: '10:00 AM',
        overview: 'My expertise lies in environmental science and sustainability. I am dedicated to finding innovative solutions to address climate change and promote a more sustainable future through my research and writing.',
        rating: 4.7,
        reviews: 4210,
        courses: 6,
        edits: 2154,
        responseTime: 'badly responsive',
        certificates: 'M.Sc. in Environmental Science',
        profileLink: 'https://www.linkedin.com/in/michael-davis-3b2a1c9d/',
        id: '0xD66d94570443DA7252375bc1eb0e322A0a3fccCC'
      },
      {
        name: 'Sophia Wilson',
        role: 'Author',
        location: 'Tokyo',
        time: '4:30 PM',
        overview: 'I am a computer scientist specializing in artificial intelligence and machine learning. My research focuses on developing intelligent algorithms and systems to tackle complex real-world problems.',
        rating: 4.9,
        reviews: 9562,
        courses: 15,
        edits: 311,
        responseTime: 'very responsive',
        certificates: 'B.Sc. in Computer Science',
        profileLink: 'https://www.linkedin.com/in/sophia-wilson-7d6e5f4e/',
        id: '0x65B97D2ba4BD5F4eB6f010a4ECA056E2d20BFE93'
      },
      {
        name: 'Emma Thompson',
        role: 'Author',
        location: 'Sydney',
        time: '8:00 AM',
        overview: 'I am a marine biologist with a focus on coral reef conservation. My research aims to understand the impacts of climate change on coral ecosystems and develop strategies for their protection.',
        rating: 4.6,
        reviews: 3207,
        courses: 9,
        edits: 215,
        responseTime: 'responsive',
        certificates: 'M.Sc. in Marine Biology',
        profileLink: 'https://www.linkedin.com/in/emma-thompson-5a6b7c8d/',
        id: '1'
      },
      {
        name: 'Robert Anderson',
        role: 'Editor',
        location: 'Chicago',
        time: '3:30 PM',
        overview: 'With years of experience in the publishing industry, I provide meticulous editing services to ensure clarity, coherence, and grammatical correctness in written works. I specialize in academic and technical editing.',
        rating: 4.3,
        reviews: 1478,
        courses: 0,
        edits: 6254,
        responseTime: 'responsive',
        certificates: 'Editing Certificate',
        profileLink: 'https://www.linkedin.com/in/robert-anderson-1b2c3d4e/',
        id: '2'
      },
      {
        name: 'Isabella Garcia',
        role: 'Author/Editor',
        location: 'Barcelona',
        time: '11:30 AM',
        overview: 'As a social psychologist, I explore the complexities of human behavior and the influences of social interactions. My work focuses on understanding the factors that shape individual and group dynamics.',
        rating: 4.9,
        reviews: 5126,
        courses: 10,
        edits: 3269,
        responseTime: 'very responsive',
        certificates: 'Ph.D. in Social Psychology',
        profileLink: 'https://www.linkedin.com/in/isabella-garcia-2c3d4e5f/',
        id: '3'
      },
      {
        name: 'Oliver Martinez',
        role: 'Author',
        location: 'Berlin',
        time: '6:00 PM',
        overview: 'I am a historian specializing in ancient civilizations. My research delves into the mysteries of ancient Egypt, unravelling the secrets of pharaohs, pyramids, and the rich cultural heritage of the Nile Valley.',
        rating: 4.7,
        reviews: 2984,
        courses: 5,
        edits: 74,
        responseTime: 'responsive',
        certificates: 'B.A. in History',
        profileLink: 'https://www.linkedin.com/in/oliver-martinez-3d4e5f6g/',
        id: '4'
      },
      {
        name: 'Sophie Thompson',
        role: 'Editor',
        location: 'Toronto',
        time: '10:30 AM',
        overview: 'With a passion for storytelling, I specialize in developmental editing, helping authors shape their narratives and craft compelling characters. My goal is to empower writers to create impactful stories.',
        rating: 4.4,
        reviews: 2176,
        courses: 0,
        edits: 4591,
        responseTime: 'responsive',
        certificates: 'Editing Certificate',
        profileLink: 'https://www.linkedin.com/in/sophie-thompson-5f6g7h8i/',
        id: '5'
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

    async ngOnInit() {
      this.route.params.subscribe(params => {
        this.authorId = params['id'];
      });

      this.currentArticle = this.relatedArticles2[this.authorId];
      this.currentArticleReviewes = this.reviews[0];

      //prov??
      await this.getTheArticle();

      console.log(this.articleObject)
      if(this.articleObject.reviews && this.articleObject.reviews.length >= 3){
        this.articleReviews = [this.articleObject.reviews[0], this.articleObject.reviews[1], this.articleObject.reviews[2], this.articleObject.reviews[3]];
      }
      else{
        this.articleReviews = [this.reviewer1, this.reviewer2, this.reviewer3];
      }
    }

    async getTheArticle() {
      await this.articleContractService.getArticle(this.authorId).then((article) => {
        this.articleObject = article;
        console.log("Works!")
        
      }).catch((error) => {
        console.error("Error: ", error);
      });
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
          return Number(sum) + Number(review.score);
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

  getAuthorNameById(authorId: string | null | undefined): string {
    if (!authorId) {
      return '';
    }
  
    const author = this.authors.find((author) => author.id === authorId);
    return author ? author.name : '';
  }
  
}
