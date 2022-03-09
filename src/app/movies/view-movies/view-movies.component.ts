import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { Alert } from 'src/app/shared/models/alert';
import { Movie } from 'src/app/shared/models/movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/core/movies.service';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.scss'],
})
export class ViewMoviesComponent implements OnInit {
  readonly noPhoto = 'assets/images/image-not-found.jpg';
  id!: number;
  movie!: Movie;
  constructor(
    public materialDialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private movieService: MoviesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.getMovie();
  }

  delete(): void {
    const configModal = {
      data: {
        title: 'Are you sure?',
        description: 'If you want delete this movie, click in delete',
        btnSucess: 'DELETE',
        btnCancel: 'Cancel',
        haveCancelBtn: true,
        colorBtnCancel: 'accent',
        colorBtnSucess: 'warn',
      } as Alert,
    };

    const dialog = this.materialDialog.open(AlertComponent, configModal);
    dialog.afterClosed().subscribe((clickInSucess) => {
      if (clickInSucess) {
        this.movieService
          .deleteMovie(this.id)
          .subscribe(() => this.router.navigateByUrl('/movies'));
      }
    });
  }
  edit(): void {
    this.router.navigateByUrl('/movies/create/' + this.id);
  }

  private getMovie(): void {
    this.movieService
      .getElementById(this.id)
      .subscribe((movie: Movie) => (this.movie = movie));
  }
}
