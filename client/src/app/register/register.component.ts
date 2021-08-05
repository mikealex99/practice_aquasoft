import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../service_controller/auth.service.service';
import { TokenStorageService } from '../service_controller/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  form: any = {
    username: null,
    email: null,
    password: null
  };

  //variables
  isSuccessful = false;
  isRegisterFailed = false;
  errorMessage = '';


  constructor( private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService,private titleService: Title) { 
    this.titleService.setTitle('Inregistrare');
  }


  ngOnInit(): void {

  }

  onSubmit(): void {
    const {username, email, password} = this.form;

    this.authService.register(username, email, password).subscribe(
      response => {
        console.log(response)

        this.tokenStorage.saveToken(response.accesstoken)
        this.tokenStorage.saveTokenRefresh(response.refreshtoken)
        sessionStorage.setItem('loggedUser', response.newUser.username);
        
        this.isSuccessful = true

        this.redirectPage()

      },
      err => {
        this.errorMessage = err.error.message
        this.isRegisterFailed = true
      }
    )

  }

  redirectPage(): void {
    this.router.navigateByUrl('/home')
  }
  
}
