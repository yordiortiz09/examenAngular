import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  formu = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get name() {
    return this.formu.get('name') as FormControl;
  }
  get email() {
    return this.formu.get('email') as FormControl;
  }
  get password() {
    return this.formu.get('password') as FormControl;
  }

  registrar() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('name', this.formu.value.name!);
    body.set('email', this.formu.value.email!);
    body.set('password', this.formu.value.password!);

    this.http.post<User>('http://192.168.137.107:3333/user/registrar', body.toString(), { headers }).subscribe(
      response => {
       if (response && response.status && response.status === true) {
         alert(`Se produjo un error: ${response.status}`);
         } else {
           alert('Los datos se enviaron correctamente');
           this.formu.reset();
           this.router.navigate(['/login']);
         }
       },
       error => {
         alert(`Se produjo un error: ${error}`);
       }
     );
 
  }
}
