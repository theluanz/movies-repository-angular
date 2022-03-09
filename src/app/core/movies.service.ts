import { ConfigParamsService } from './config-params.service';
import { ConfigParams } from './../shared/models/config-params';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../shared/models/movie';

const url = 'http://localhost:3000/movies/';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(
    private httpClient: HttpClient,
    private configParamsService: ConfigParamsService
  ) {}

  saveMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(url, movie);
  }

  listMoviesPaginate(configParams: ConfigParams): Observable<Movie[]> {
    const httpParams = this.configParamsService.configurateParams(configParams);
    return this.httpClient.get<Movie[]>(url, { params: httpParams });
  }
}
