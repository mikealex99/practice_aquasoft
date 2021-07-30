import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserModel } from '../register/userModel';
//import { JwtService } from '../service_controller/jwt.service';
//import { AuthService } from '../service_controller/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formValue !: FormGroup
  userModelObj : UserModel = new UserModel()
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';


  constructor(private formbuilder: FormBuilder,private titleService: Title) {
    this.titleService.setTitle('Logare');
   }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      username: ['', Validators.required],
      password : ['', Validators.required],
    })

  }

  loginUser(){

    // this.userModelObj.username = this.formValue.value.username;
    // this.userModelObj.password = this.formValue.value.password;

    
    // this.jwtService.login(this.userModelObj.username, this.userModelObj.password).subscribe(
    //   data => {
    //     this.saveUserLocal(data);

    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
  
    //     this.loadPage();
    //   },
    //   err => {
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //   }
    // );
}

loadPage(): void {
  window.location.href="/employees";
}

}
