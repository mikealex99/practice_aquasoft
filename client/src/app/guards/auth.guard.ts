import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../service_controller/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  canActivate() {
    if (!this.tokenStorage.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.tokenStorage.isLoggedIn();
  }
}