import { Component, Inject } from '@angular/core';
import { Article } from '../../../interfaces/article';
import { Router } from '@angular/router';
import { ArticleDTO } from 'src/app/interfaces/article.model';
import { ReviewData } from 'src/app/interfaces/article.model';
import { ArticleContractService } from '../../../article.contract.service';
import { Author } from '../../../interfaces/author'

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
    if(this.allArticles.length >= 4) {
      this.currentArticle = this.allArticles[0];
      this.recommendedArticles = this.getRandomArticles(4);
      this.popularArticles = this.allArticles.slice(0, 4);
    }

    else if(this.allArticles.length == 0) {
      this.currentArticle = null;
      this.recommendedArticles = new Array<ArticleDTO>();
      this.popularArticles = new Array<ArticleDTO>();
    }

    else {
      this.currentArticle = this.allArticles[0];
      this.recommendedArticles = this.getRandomArticles(this.allArticles.length);
      this.popularArticles = this.allArticles;
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

  calculateAverageScoreAll(reviews: ReviewData[] | undefined | null): number {
    if (!reviews || reviews.length === 0) {
      return 0;
    }

    const sum = reviews.reduce((total, review) => Number(total) + (Number(review.score) || 0), 0);
    return sum / reviews.length;
  }


  getAuthorNameById(authorId: string | null | undefined): string {
    if (!authorId) {
      return '';
    }
    const author = this.authors.find((author) => author.id === authorId);
    return author ? author.name : '';
  }
}
