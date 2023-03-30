import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  user: User[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  get password() {
    return this.form.get('password') as FormControl;
  }
  get email() {
    return this.form.get('email') as FormControl;
  }

  onSubmit(values: User) {
    this.authService.login(values).subscribe(
      (response: any) => {
        console.log(response);
        alert('Se ha logueado correctamente');
        localStorage.setItem('token', response.token);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
