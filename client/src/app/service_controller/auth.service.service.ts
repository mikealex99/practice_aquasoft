import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { Tokens } from './token';

const AUTH_API = 'http://localhost:9999/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { 
  }

  login(username: string, password: string ): Observable<any> {
    return this.http.post<any>(AUTH_API + 'login', {
      username,password
    })
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
      email,
      password
    }, httpOptions);
  }
  

  refreshTokenn(){
    return this.http.get(AUTH_API + 'refresh_token')
}

  logout():Observable<any> {
  return this.http.get(AUTH_API + 'logout')
}

}