import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  clearInput(event: MouseEvent, form: FormGroup) {
    let formGroup = (event.target as HTMLElement).parentNode
    var formControlName = formGroup?.children.item(1)?.attributes.getNamedItem('formControlName')?.value;
    form.get(`${formControlName}`)?.setValue(null);
  }
}
