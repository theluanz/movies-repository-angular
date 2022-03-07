import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CreateMovieComponent } from './create-movie/create-movie.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListMoviesComponent } from './list-movies/list-movies.component';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  declarations: [CreateMovieComponent, ListMoviesComponent],
})
export class MoviesModule {}
