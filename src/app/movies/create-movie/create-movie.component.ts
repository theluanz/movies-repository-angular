import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidateInputsService } from 'src/app/shared/components/inputs/validate-inputs.service';

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
    private formBuilder: FormBuilder
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
  saveMovie(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    alert('Sucess !! \n\n' + JSON.stringify(this.form.value, null, 4));
  }
  resetForm(): void {
    this.form.reset();
  }
}
