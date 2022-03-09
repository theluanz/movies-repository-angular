import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

import { MoviesService } from 'src/app/core/movies.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ValidateInputsService } from 'src/app/shared/components/inputs/validate-inputs.service';
import { Alert } from 'src/app/shared/models/alert';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
})
export class CreateMovieComponent implements OnInit {
  form!: FormGroup;
  categorys!: Array<string>;
  id!: number;

  constructor(
    public validateInputsService: ValidateInputsService,
    public materialDialog: MatDialog,
    private formBuilder: FormBuilder,
    private movieService: MoviesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    console.log(this.activeRoute.snapshot.params['id']);
    if (this.id) {
      this.movieService
        .getElementById(this.id)
        .subscribe((movie: Movie) => this.createForm(movie));
    } else {
      console.log(this.id);

      this.createForm(this.createEmptyMovie());
    }
    this.categorys = [
      'Action',
      'Adventure',
      'Horror',
      'Comedy',
      'Science fiction',
    ];
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const movie = this.form.getRawValue() as Movie;
    if (this.id) {
      movie.id = this.id;
      this.edit(movie);
    } else {
      this.save(movie);
    }
  }

  resetForm(): void {
    this.form.reset();
  }
  private createEmptyMovie() {
    return {
      title: '',
      urlPhoto: '',
      releasedDate: '',
      description: '',
      imdbScore: 0,
      urlImdb: '',
      category: '',
    } as Movie;
  }
  private createForm(movie: Movie): void {
    this.form = this.formBuilder.group({
      title: [
        movie.title,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      urlPhoto: [movie.urlPhoto, [Validators.minLength(10)]],
      releasedDate: [movie.releasedDate, [Validators.required]],
      description: [movie.description],
      imdbScore: [
        movie.imdbScore,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      urlImdb: [
        movie.urlImdb,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      category: [movie.category, [Validators.required]],
    });
  }

  private save(movie: Movie): void {
    this.movieService.saveMovie(movie).subscribe(
      () => {
        const config = {
          data: {
            btnSucess: 'Go to listing',
            btnCancel: 'Create other movie',
            haveCancelBtn: true,
            colorBtnCancel: 'primary',
          } as Alert,
        };

        const dialog = this.materialDialog.open(AlertComponent, config);
        dialog.afterClosed().subscribe((clickInSucess) => {
          if (clickInSucess) {
            this.router.navigateByUrl('movies');
          } else {
            this.resetForm();
          }
        });
      },
      () => {
        const config = {
          data: {
            title: 'Error',
            description: 'We were unable to save your movie, try again later',
            btnSucess: 'Close',
            colorBtnSucess: 'warn',
          } as Alert,
        };
        this.materialDialog.open(AlertComponent, config);
      }
    );
  }

  private edit(movie: Movie): void {
    this.movieService.editMovie(movie).subscribe(
      () => {
        const config = {
          data: {
            description: 'Your movie has been saved!',
            btnSucess: 'Go to listing',
          } as Alert,
        };

        const dialog = this.materialDialog.open(AlertComponent, config);
        dialog
          .afterClosed()
          .subscribe(() => this.router.navigateByUrl('movies'));
      },
      () => {
        const config = {
          data: {
            title: 'Error',
            description: 'We were unable to save your movie, try again later',
            btnSucess: 'Close',
            colorBtnSucess: 'warn',
          } as Alert,
        };
        this.materialDialog.open(AlertComponent, config);
      }
    );
  }
}
