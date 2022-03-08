import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidateInputsService {
  constructor() {}
  hasErrorValidate(control: AbstractControl, errorName: string): boolean {
    if (
      (control.dirty || control.touched) &&
      this.hasErrorInput(control, errorName)
    ) {
      return true;
    }
    return false;
  }

  hasErrorInput(control: AbstractControl, errorName: string): boolean {
    return control.hasError(errorName);
  }

  lenghtValidator(control: AbstractControl, errorName: string): number {
    const error = control.errors?.[errorName];

    return error.requiredLength || error.min || error.max || 0;
  }
}
