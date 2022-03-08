import { ValidateInputsService } from 'src/app/shared/components/inputs/validate-inputs.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
})
export class InputNumberComponent {
  @Input() inputName!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() minValue = 0;
  @Input() maxValue = 10;
  @Input() stepValue = '1';

  constructor(public validateInputsService: ValidateInputsService) {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
