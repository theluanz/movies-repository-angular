import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CreateMovieComponent } from './create-movie/create-movie.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { FieldsModule } from '../shared/components/fields/fields.module';
import { ViewMoviesComponent } from './view-movies/view-movies.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FieldsModule,
    InfiniteScrollModule,
  ],
  declarations: [
    CreateMovieComponent,
    ListMoviesComponent,
    ViewMoviesComponent,
  ],
  exports: [CreateMovieComponent, ListMoviesComponent],
})
export class MoviesModule {}
