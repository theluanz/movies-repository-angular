import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
})
export class CreateMovieComponent implements OnInit {
  options!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.options = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }
}
