import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleDetailsComponent } from './modules/article-details/article-details/article-details.component';
import { ArticleListingComponent } from './modules/article-listing/article-listing/article-listing.component';
import { ArticleListingPopularComponent } from './modules/article-listing/article-listing-popular/article-listing-popular.component';
import { ArticleListingRecommendedComponent } from './modules/article-listing/article-listing-recommended/article-listing-recommended.component';
import { AuthorsProfileComponent } from './modules/authors-profile/authors-profile/authors-profile.component';
import { AuthorsProfileArticlesComponent } from './modules/authors-profile/authors-profile-articles/authors-profile-articles.component';
import { EditArticleComponent } from './modules/edit-article/edit-article/edit-article.component';
import { PublishArticleComponent } from './modules/publish-article/publish-article/publish-article.component';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArticleListingComponent,
    ArticleListingPopularComponent,
    ArticleListingRecommendedComponent,
    ArticleDetailsComponent,
    AuthorsProfileComponent,
    AuthorsProfileArticlesComponent,
    PublishArticleComponent,
    EditArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RatingModule.forRoot(),
    MatProgressBarModule,
    NgxDropzoneModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
