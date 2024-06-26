import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class UsuarioNovo {
  nome = new FormControl<string>("", [Validators.required, Validators.minLength(3), textTrim()]);
  username = new FormControl<string>("", [Validators.required, Validators.minLength(3), noWhitespaceValidator()]);
  email = new FormControl<string>("", [Validators.required, Validators.email]);
  senha = new FormControl<string>("", [Validators.required, Validators.minLength(6)]);
  confirmacaoSenha = new FormControl<string>("", [Validators.required, passwordEquals()]);
}

function passwordEquals(): ValidatorFn {
  return (confirmacaoSenhaControl: AbstractControl): ValidationErrors | null => {
    let formGroup = confirmacaoSenhaControl.parent
    let senhaControl = formGroup?.get('senha')
    if (senhaControl?.value != confirmacaoSenhaControl.value) {
      return { passwordequal: true }
    }
    return null
  }
}

function textTrim(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    let value = control.value
    return value?.trim() === value ? null : { texttrim: true }
  }
}

function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /\s/g;
    return !regex.test(value) ? null : { nowhitespace: true };
  };
}



