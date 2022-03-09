import { Router } from '@angular/router';
import { ConfigParams } from './../../shared/models/config-params';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MoviesService } from 'src/app/core/movies.service';
import { Movie } from 'src/app/shared/models/movie';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss'],
})
export class ListMoviesComponent implements OnInit {
  readonly noPhoto = 'assets/images/image-not-found.jpg';
  categorys: Array<string> = [];

  configParams: ConfigParams = {
    page: 0,
    numberOfPosts: 4,
  };

  movies: Movie[] = [];
  formFilter!: FormGroup;

  constructor(
    private movieService: MoviesService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.listMovies();
  }

  ngOnInit(): void {
    this.formFilter = this.fb.group({
      text: [''],
      category: [''],
    });
    this.categorys = [
      'Action',
      'Adventure',
      'Horror',
      'Comedy',
      'Science fiction',
    ];

    this.formFilter
      .get('text')
      ?.valueChanges.pipe(debounceTime(400))
      .subscribe((value: string) => {
        this.configParams.textSearch = value;
        this.resetSearches();

        this.listMovies();
      });
    this.formFilter.get('category')?.valueChanges.subscribe((value: string) => {
      this.configParams.field = { type: 'category', value: value };
      this.resetSearches();
      this.listMovies();
    });
  }

  onScroll(): void {
    this.listMovies();
  }
  open(id: number): void {
    this.router.navigateByUrl(`movies/${id}`);
  }

  private listMovies(): void {
    this.configParams.page++;
    this.movieService
      .listMoviesPaginate(this.configParams)
      .subscribe((moviesRequest: Movie[]) => {
        this.movies.push(...moviesRequest);
      });
  }
  private resetSearches(): void {
    this.configParams.page = 0;
    this.movies = [];
  }
}
