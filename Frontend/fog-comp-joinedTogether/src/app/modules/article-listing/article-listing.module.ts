import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListingRoutingModule } from './article-listing-routing.module';
import { ArticleListingComponent } from './article-listing/article-listing.component';
import { ArticleListingRecommendedComponent } from './article-listing-recommended/article-listing-recommended.component';
import { ArticleListingPopularComponent } from './article-listing-popular/article-listing-popular.component';
import { ArticleListingRelatedComponent } from './article-listing-related/article-listing-related.component';

@NgModule({
  declarations: [
    ArticleListingComponent,
    ArticleListingRecommendedComponent,
    ArticleListingPopularComponent,
    ArticleListingRelatedComponent
  ],
  imports: [
    CommonModule,
    ArticleListingRoutingModule
  ]
})
export class ArticleListingModule { }
