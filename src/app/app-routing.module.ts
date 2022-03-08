import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { NgModule } from '@angular/core';
import { MoviesModule } from './movies/movies.module';
import { RouterModule, Routes } from '@angular/router';
import { CreateMovieComponent } from './movies/create-movie/create-movie.component';

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
  imports: [RouterModule.forRoot(routes), MoviesModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
