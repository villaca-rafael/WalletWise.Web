import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class UsuarioLogin {
  username = new FormControl<string>("",
    [
      Validators.required,
      Validators.minLength(3),
      noWhitespaceValidator()
    ]);
  senha = new FormControl<string>("",
    [
      Validators.required,
      Validators.minLength(6)
    ]);
}

function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /\s/g;
    return !regex.test(value) ? null : { nowhitespace: true };
  };
}
