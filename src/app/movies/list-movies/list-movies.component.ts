import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/movies.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss'],
})
export class ListMoviesComponent implements OnInit {
  readonly numberOfPosts = 4;
  page = 0;

  movies: Movie[] = [];

  constructor(private movieService: MoviesService) {
    this.listMovies();
  }

  ngOnInit(): void {}
  onScroll(): void {
    this.listMovies();
  }
  open() {}

  private listMovies(): void {
    this.page++;
    this.movieService
      .listMoviesPaginate(this.page, this.numberOfPosts)
      .subscribe((moviesRequest: Movie[]) => {
        this.movies.push(...moviesRequest);
      });
  }
}
