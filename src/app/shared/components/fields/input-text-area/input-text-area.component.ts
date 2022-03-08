import { ValidateInputsService } from 'src/app/shared/components/inputs/validate-inputs.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-text-area',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.scss'],
})
export class InputTextAreaComponent {
  @Input() inputName!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;

  constructor(public validateInputsService: ValidateInputsService) {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
