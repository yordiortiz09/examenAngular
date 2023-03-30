import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(   private http: HttpClient,
    private router: Router) { }

    getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    }
    isValid(): boolean {
      const token = localStorage.getItem('token');
      return true;
    }
    logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('rol_id');
      localStorage.removeItem('id');
      localStorage.removeItem('name');
    }
    
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  login(user: User) {
    return this.http
      .post<User>( 'http://192.168.137.107:3333' + '/user/login', user)
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ha ocurrido un error:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(() => new Error('Vuelva a intentar más tarde.'));
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
}
