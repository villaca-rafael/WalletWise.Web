import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged } from 'rxjs';
import { UsuarioNovo } from 'src/app/shared/models/usuario-novo';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  show: boolean = false;
  usuarioNovoForm: FormGroup<UsuarioNovo>
  currentStep: number = 1;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.usuarioNovoForm = this.formBuilder.group(new UsuarioNovo());

    this.usuarioNovoForm.controls.senha.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.usuarioNovoForm.controls.confirmacaoSenha.updateValueAndValidity();
    })

    this.usuarioNovoForm.controls.username.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(value =>
      this.usuarioNovoForm.controls.username.setValue(value?.toLowerCase() || null)
    )
  }

  nextStep(event: MouseEvent) {
    let currentDataStep = Number((event.target as HTMLElement).attributes.getNamedItem("data-step")?.value);
    this.currentStep = currentDataStep;
  }

  nextStepByKey(event: KeyboardEvent) {
    if (event.key === "Enter" && this.currentStep < 4) {
      this.currentStep++
    }
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

  register() {
    if (this.usuarioNovoForm.valid) {
      console.log(this.usuarioNovoForm.value);
      this.toastrService.success("Usuário cadastrado com sucesso!")
      this.router.navigate(['login'])
    }
  }

  goLogin() {
    this.router.navigate(['login'])
  }
}
