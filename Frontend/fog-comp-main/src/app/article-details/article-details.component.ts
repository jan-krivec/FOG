import { Component } from '@angular/core';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent {
    articles: Article[] = [
        {
            title: 'Article 1',
            category: 'Category 1',
            rating: 1,
            imageUrl: 'https://picsum.photos/200/300'
        },
        {
            title: 'Article 2',
            category: 'Category 2',
            rating: 2,
            imageUrl: 'https://picsum.photos/200/300'
        },
        {
          title: 'Article 3',
          category: 'Category 1',
          rating: 1,
          imageUrl: 'https://picsum.photos/200/300'
        },
        {
          title: 'Article 4',
          category: 'Category 2',
          rating: 2,
          imageUrl: 'https://picsum.photos/200/300'
        },
        {
          title: 'Article 5',
          category: 'Category 1',
          rating: 1,
          imageUrl: 'https://picsum.photos/200/300'
        },
        {
          title: 'Article 6',
          category: 'Category 2',
          rating: 2,
          imageUrl: 'https://picsum.photos/200/300'
        },
        {
          title: 'Article 7',
          category: 'Category 1',
          rating: 1,
          imageUrl: 'https://picsum.photos/200/300'
        },
        {
          title: 'Article 8',
          category: 'Category 2',
          rating: 2,
          imageUrl: 'https://picsum.photos/200/300'
        },
        {
          title: 'Article 9',
          category: 'Category 1',
          rating: 1,
          imageUrl: 'https://picsum.photos/200/300'
        },
        {
          title: 'Article 10',
          category: 'Category 2',
          rating: 2,
          imageUrl: 'https://picsum.photos/200/300'
        },
      ];
}
