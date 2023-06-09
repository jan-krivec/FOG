import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListingComponent } from './article-listing/article-listing.component';
import { ArticleListingPopularComponent } from './article-listing-popular/article-listing-popular.component';
import { ArticleListingRecommendedComponent } from './article-listing-recommended/article-listing-recommended.component';
import { ArticleListingRelatedComponent } from './article-listing-related/article-listing-related.component';
import { ArticleListingEditComponent } from './article-listing-edit/article-listing-edit.component';
import { ArticleListingReviewComponent } from './article-listing-review/article-listing-review.component'

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
  {
    path: 'article-listing/related',
    component: ArticleListingRelatedComponent,
  },
  {
    path: 'article-listing/edit:id',
    component: ArticleListingEditComponent,
  },
  {
    path: 'article-listing/review:id',
    component: ArticleListingReviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleListingRoutingModule { }
