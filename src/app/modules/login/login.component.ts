import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged } from 'rxjs';
import { UsuarioLogin } from 'src/app/shared/models/usuario-login';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit{
  show: boolean = false;
  usuarioLoginForm: FormGroup<UsuarioLogin>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.usuarioLoginForm = this.formBuilder.group(new UsuarioLogin());

    this.usuarioLoginForm.controls.username.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(value =>
      this.usuarioLoginForm.controls.username.setValue(value?.toLowerCase() || null)
    )
  }

  showPassword(event: MouseEvent) {
    this.show = !this.show;
    let formGroup = (event.target as HTMLElement).parentNode
    let inputType = formGroup!.children.item(1)!.attributes.getNamedItem('type')

    if (this.show) {
      inputType!.value = "text"
    } else {
      inputType!.value = "password"
    }
  }

  login() {
    if (this.usuarioLoginForm.valid) {
      this.toastrService.success("Usuário logado com sucesso!")
    }
  }

  goRegister() {
    this.router.navigate(["register"]);
  }
}
