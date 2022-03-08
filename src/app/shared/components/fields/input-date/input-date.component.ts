import { ValidateInputsService } from 'src/app/shared/components/inputs/validate-inputs.service';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent {
  @Input() inputName!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;

  constructor(public validateInputsService: ValidateInputsService) {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
