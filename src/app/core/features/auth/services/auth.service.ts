import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }

  login(email: string): Observable<any | null> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email }).pipe(
      catchError(error => {
        if (error.status === 404) {

          console.error('Login error:', error);
          return of(null);
        }

        return throwError(() => new Error('Login failed: ' + error.message));
      }));
  }

  createUser(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { email });
  }

  loginOrCreate(email: string): Observable<any> {
    return this.login(email).pipe(
      switchMap(user => user ? of(user) : this.createUser(email))
    );
  }
}
