import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Tokens } from './token';

const USER_KEY = 'accesstoken';
const REFRESH_KEY = 'refreshtoken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
loggedUser : any

  constructor() { }

  signOut(): void {
    window.localStorage.clear();
  }

  saveToken(accesstoken: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, accesstoken);
    
  }

  saveTokenRefresh(refreshtoken: any): void {
    window.localStorage.removeItem(REFRESH_KEY);
    window.localStorage.setItem(REFRESH_KEY, refreshtoken);
  }

  isLoggedIn() {
    return !!this.getJwtKey();
  }

  getRefreshToken():any {
    return localStorage.getItem(REFRESH_KEY);
  }

  doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  getJwtKey():any {
    return localStorage.getItem(USER_KEY);
  }

  removeTokens() {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(REFRESH_KEY);
  }

 storeTokens(tokens: Tokens) {
    window.localStorage.setItem(USER_KEY, tokens.accesstoken);
    window.localStorage.setItem(REFRESH_KEY, tokens.refreshtoken);
  }

 doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

}
