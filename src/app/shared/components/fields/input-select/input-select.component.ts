import { ValidateInputsService } from './../../inputs/validate-inputs.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent {
  @Input() inputName!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() options!: Array<string>;

  constructor(public validateInputsService: ValidateInputsService) {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
