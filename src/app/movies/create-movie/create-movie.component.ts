import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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

  constructor(
    public validateInputsService: ValidateInputsService,
    public materialDialog: MatDialog,
    private formBuilder: FormBuilder,
    private movieService: MoviesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categorys = [
      'Action',
      'Adventure',
      'Horror',
      'Comedy',
      'Science fiction',
    ];
    this.form = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      urlPhoto: ['', [Validators.minLength(10)]],
      releasedDate: ['', [Validators.required]],
      description: [''],
      imdbScore: [
        0,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      imdbUrl: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      category: ['', [Validators.required]],
    });
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
    this.save(movie);
  }

  resetForm(): void {
    this.form.reset();
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
}
