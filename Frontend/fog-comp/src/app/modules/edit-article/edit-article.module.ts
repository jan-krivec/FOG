import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditArticleRoutingModule } from './edit-article-routing.module';
import { EditArticleComponent } from './edit-article/edit-article.component';


@NgModule({
  declarations: [
    EditArticleComponent
  ],
  imports: [
    CommonModule,
    EditArticleRoutingModule
  ]
})
export class EditArticleModule { }
