import { Component } from '@angular/core';
import { ArticleDTO } from 'src/app/interfaces/article.model';
import { ArticleContractService } from '../../../article.contract.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-listing-edit',
  templateUrl: './article-listing-edit.component.html',
  styleUrls: ['./article-listing-edit.component.css']
})
export class ArticleListingEditComponent {

  articlesToEdit! : ArticleDTO[];
  addressId! : string;

  articlesToEdit2 : ArticleDTO[] = [
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
      reviews: [] },
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
      reviews: []
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
      reviews: []
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
      reviews: []
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
      reviews: []
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
      reviews: []
    },
    

  ]

  constructor(private articleContractService : ArticleContractService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.addressId = params['id'];
    });

    this.getEditArticles(this.addressId);

    console.log(this.articlesToEdit);
  }

  async getEditArticles(id: string) {
    this.articlesToEdit = await this.articleContractService.getJournalsByEditor(id);
  }

  navigateToSelectedArticle(articleId: number) {
    this.router.navigate(['article-details', articleId]);
  }

  navigateToEditArticle(articleId: number) {
    this.router.navigate(['edit-article', articleId]);
    console.log(articleId)
  }

}
