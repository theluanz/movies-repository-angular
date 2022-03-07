import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMovieComponent } from './movies/create-movie/create-movie.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    children: [
      {
        path: '',
        component: ListMoviesComponent,
      },
      {
        path: 'create',
        component: CreateMovieComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
