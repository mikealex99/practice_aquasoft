import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service_controller/auth.service.service';
import { TokenStorageService } from '../service_controller/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  
  }

  onSubmit(): void {
    const { username, password } = this.form;

      this.authService.login(username, password).subscribe(response => {
      sessionStorage.setItem('loggedUser', response.user.username);
      this.tokenStorage.saveToken(response.accesstoken)
      this.tokenStorage.saveTokenRefresh(response.refreshtoken)

      this.isLoginFailed = false;
      this.isLoggedIn = true;

      this.router.navigateByUrl('/home')
    }, err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    });
}


}
