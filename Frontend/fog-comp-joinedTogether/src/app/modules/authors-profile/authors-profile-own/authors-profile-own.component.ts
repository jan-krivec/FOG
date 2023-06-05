import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../interfaces/article';
import { Author } from '../../../interfaces/author';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authors-profile-own',
  templateUrl: './authors-profile-own.component.html',
  styleUrls: ['./authors-profile-own.component.css']
})
export class AuthorsProfileOwnComponent {

  authorId!: number;
  author!: Author;
  authorData!: { author: Author; articles: Article[]; };// | undefined;
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  firstShown = 0;
  secondShown = 1;
  
  max = 5;
  rate = 0;
  isReadonly = true;

  numbers: number[] = [0,0,0,0,0];

  authors: Author[] = [
    {
      name: 'Klara Weaver',
      role: 'Author/Editor',
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
      id: 1
    },
    {
      name: 'John Smith',
      role: 'Author',
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
      id: 2
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
      id: 3
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
      id: 4
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
      id: 5
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
      id: 6
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
      id: 7
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
      id: 8
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
      id: 9
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
      id: 10
    }
  ];



  associatedData: { author: Author, articles: Article[] }[] = [];

  role! : Observable<Object>;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private roleService: RoleService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authorId = +params['id'];
      this.loadAuthorData();
    });

    this.getRoleOfAuthor(this.authorId.toString());

  }

  

  getRoleOfAuthor(id: string) {
    
    this.roleService.getRole1(id)
  .then(role => {
    console.log(role); // Use the role value
  })
  .catch(error => {
    console.log('Error:', error);
  });

  }
  

  loadAuthorData() {
    const foundAuthor = this.authors.find(author => author.id === this.authorId);
    if (foundAuthor) {
      this.author = foundAuthor;
    } else {
      // Handle the case when author is not found
      // For example, you can display an error message or redirect to a different page
      console.log('Author not found');
    }
  }
  
  goToArticles() {
    this.router.navigate(['authors-profile', 'articles', this.authorId]);
  }

  goToReviews() {
    this.router.navigate(['article-listing', 'review', this.authorId]);
  }

  goToEdits() {
    this.router.navigate(['article-listing', 'edit', this.authorId]);
  }

  goToPublish() {
    this.router.navigate(['publish-article'])
  }

  openTextField() {
    alert("You can't send messages to this author!");
  }

}