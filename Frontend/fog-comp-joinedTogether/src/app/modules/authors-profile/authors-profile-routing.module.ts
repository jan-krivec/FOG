import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsProfileComponent } from './authors-profile/authors-profile.component';
import { AuthorsProfileArticlesComponent } from './authors-profile-articles/authors-profile-articles.component';

const routes: Routes = [
  {
    path: 'authors-profile',
    component: AuthorsProfileComponent,
    children: [
      {
        path: 'articles/:id',
        component: AuthorsProfileArticlesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorsProfileRoutingModule { }
