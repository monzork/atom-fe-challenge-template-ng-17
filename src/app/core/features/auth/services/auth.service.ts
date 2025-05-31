import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl = 'https://api-wdqfge2wtq-uc.a.run.app/api/users';
  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<any | null> {
    return this.http.get<any>(`${this.baseUrl}/users?email=${email}`);
  }

  createUser(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, { email });
  }

  loginOrCreate(email: string): Observable<any> {
    return this.getUserByEmail(email).pipe(
      switchMap(user => user ? of(user) : this.createUser(email))
    );
  }
}
