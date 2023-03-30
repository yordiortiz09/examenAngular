import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { BarcosComponent } from './barcos/barcos.component';

const routes: Routes = [
  { path:'registrarse', component: RegistroComponent },
  {path:'login', component: LoginComponent},
  {path:'game', component: BarcosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
