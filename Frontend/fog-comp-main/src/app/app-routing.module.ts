import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleListingComponent } from './article-listing/article-listing.component';
import { AuthorsProfileComponent } from './authors-profile/authors-profile.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { PublishArticleComponent } from './publish-article/publish-article.component';

const routes: Routes = [
  { path: '', component: ArticleDetailsComponent },
  { path: 'article-listing', component: ArticleListingComponent },
  { path: 'authors-profile', component: AuthorsProfileComponent },
  { path: 'edit-article', component: EditArticleComponent },
  { path: 'publish-article', component: PublishArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
