import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsProfileRoutingModule } from './authors-profile-routing.module';
import { AuthorsProfileComponent } from './authors-profile/authors-profile.component';
import { AuthorsProfileArticlesComponent } from './authors-profile-articles/authors-profile-articles.component';


@NgModule({
  declarations: [
    AuthorsProfileComponent,
    AuthorsProfileArticlesComponent
  ],
  imports: [
    CommonModule,
    AuthorsProfileRoutingModule
  ]
})
export class AuthorsProfileModule { }
