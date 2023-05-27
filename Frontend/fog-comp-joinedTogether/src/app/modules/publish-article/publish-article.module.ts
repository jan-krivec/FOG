import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublishArticleRoutingModule } from './publish-article-routing.module';
import { PublishArticleComponent } from './publish-article/publish-article.component';


@NgModule({
  declarations: [
    PublishArticleComponent
  ],
  imports: [
    CommonModule,
    PublishArticleRoutingModule
  ]
})
export class PublishArticleModule { }
