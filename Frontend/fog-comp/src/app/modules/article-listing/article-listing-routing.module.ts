import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListingComponent } from './article-listing/article-listing.component';
import { ArticleListingPopularComponent } from './article-listing-popular/article-listing-popular.component';
import { ArticleListingRecommendedComponent } from './article-listing-recommended/article-listing-recommended.component';

const routes: Routes = [
  {
    path: 'article-listing',
    component: ArticleListingComponent,
  },
  {
    path: 'article-listing/recommended',
    component: ArticleListingRecommendedComponent,
  },
  {
    path: 'article-listing/popular',
    component: ArticleListingPopularComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleListingRoutingModule { }
