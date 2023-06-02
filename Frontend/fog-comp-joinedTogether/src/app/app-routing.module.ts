import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArticleDetailsComponent } from './modules/article-details/article-details/article-details.component'
import { ArticleListingComponent } from './modules/article-listing/article-listing/article-listing.component'
import { AuthorsProfileComponent } from './modules/authors-profile/authors-profile/authors-profile.component'
import { AuthorsProfileArticlesComponent } from './modules/authors-profile/authors-profile-articles/authors-profile-articles.component';
import { EditArticleComponent } from './modules/edit-article/edit-article/edit-article.component'
import { PublishArticleComponent } from './modules/publish-article/publish-article/publish-article.component'
import { ArticleListingPopularComponent } from './modules/article-listing/article-listing-popular/article-listing-popular.component';
import { ArticleListingRecommendedComponent } from './modules/article-listing/article-listing-recommended/article-listing-recommended.component';
import { ArticleListingRelatedComponent } from './modules/article-listing/article-listing-related/article-listing-related.component';
import { AuthorsProfileOwnComponent } from './modules/authors-profile/authors-profile-own/authors-profile-own.component';
import { ArticleListingEditComponent } from './modules/article-listing/article-listing-edit/article-listing-edit.component';
import { ArticleListingReviewComponent } from './modules/article-listing/article-listing-review/article-listing-review.component'

const routes: Routes = [
  { path: '', redirectTo: '/article-listing', pathMatch: 'full' },
  //{ path: '', component: ArticleDetailsComponent },
  { path: 'article-details/:id', component: ArticleDetailsComponent },
  { path: 'article-listing', component: ArticleListingComponent },
  { path: 'article-listing/recommended', component: ArticleListingRecommendedComponent },
  { path: 'article-listing/popular', component: ArticleListingPopularComponent },
  { path: 'article-listing/related', component: ArticleListingRelatedComponent},
  { path: 'article-listing/edit/:id', component: ArticleListingEditComponent },
  { path: 'article-listing/review/:id', component: ArticleListingReviewComponent},
  { path: 'authors-profile/:id', component: AuthorsProfileComponent },
  { path: 'authors-profile/articles/:id', component: AuthorsProfileArticlesComponent },
  { path: 'authors-profile/myprofile/:id', component: AuthorsProfileOwnComponent },
  { path: 'edit-article/:id', component: EditArticleComponent },
  { path: 'publish-article', component: PublishArticleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
