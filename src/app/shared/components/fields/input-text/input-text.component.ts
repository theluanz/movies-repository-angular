import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidateInputsService } from '../../inputs/validate-inputs.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent {
  @Input() inputName!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;

  constructor(public validateInputsService: ValidateInputsService) {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
