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
import { AuthorsProfileRoutingModule } from './modules/authors-profile/authors-profile-routing.module';



const routes: Routes = [
  { path: '', redirectTo: '/article-listing', pathMatch: 'full' },
  //{ path: '', component: ArticleDetailsComponent },
  { path: 'article-details/:id', component: ArticleDetailsComponent },
  { path: 'article-listing', component: ArticleListingComponent },
  { path: 'article-listing/recommended', component: ArticleListingRecommendedComponent },
  { path: 'article-listing/popular', component: ArticleListingPopularComponent },
  { path: 'authors-profile/:id', component: AuthorsProfileComponent },
  { path: 'edit-article', component: EditArticleComponent },
  { path: 'publish-article', component: PublishArticleComponent },
  { path: 'authors-profile/articles/:id', component: AuthorsProfileArticlesComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
