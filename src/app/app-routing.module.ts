import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () => import("./modules/login/login.module").then(mod => mod.LoginModule)
  },
  {
    path: "register",
    loadChildren: () => import("./modules/register/register.module").then(mod => mod.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
