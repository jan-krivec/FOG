import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListingRoutingModule } from './article-listing-routing.module';
import { ArticleListingComponent } from './article-listing/article-listing.component';
import { ArticleListingRecommendedComponent } from './article-listing-recommended/article-listing-recommended.component';
import { ArticleListingPopularComponent } from './article-listing-popular/article-listing-popular.component';
import { ArticleListingRelatedComponent } from './article-listing-related/article-listing-related.component';
import { ArticleListingEditComponent } from './article-listing-edit/article-listing-edit.component';
import { ArticleListingReviewComponent } from './article-listing-review/article-listing-review.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ArticleListingRoutingModule
  ]
})
export class ArticleListingModule { }
