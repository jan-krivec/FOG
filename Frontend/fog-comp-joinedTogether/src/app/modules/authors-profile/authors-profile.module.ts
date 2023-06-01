import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsProfileRoutingModule } from './authors-profile-routing.module';
import { AuthorsProfileComponent } from './authors-profile/authors-profile.component';
import { AuthorsProfileArticlesComponent } from './authors-profile-articles/authors-profile-articles.component';
import { AuthorsProfileOwnComponent } from './authors-profile-own/authors-profile-own.component';


@NgModule({
  declarations: [
    AuthorsProfileComponent,
    AuthorsProfileArticlesComponent,
    AuthorsProfileOwnComponent
  ],
  imports: [
    CommonModule,
    AuthorsProfileRoutingModule
  ]
})
export class AuthorsProfileModule { }
