import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../service_controller/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserModel } from './userModel';
//import { TokenStorageService } from '../service_controller/token-storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  //variables
  isSuccessful = false;
  isRegisterFailed = false;
  errorMessage = '';
  formValue !: FormGroup
  userModelObj : UserModel = new UserModel()

  constructor( private formbuilder: FormBuilder,private titleService: Title) { 
    this.titleService.setTitle('Inregistrare');
  }


  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      username: ['', Validators.required],
      password : ['', Validators.required],
      email: ['',[Validators.required, Validators.email]]
    })
  }

  // addUser(){

  //   this.userModelObj.username = this.formValue.value.username;
  //   this.userModelObj.password = this.formValue.value.password;
  //   this.userModelObj.email = this.formValue.value.email;

  //   console.log(this.userModelObj.email)

  //   this.authService.register(this.userModelObj.username,this.userModelObj.password,this.userModelObj.email).subscribe(
  //     data => {
  //       console.log(data);
  //       this.tokenStorage.saveUserLocal(data);

  //       this.isSuccessful = true;
  //       this.isRegisterFailed = false;
        
  //       this.loadPage();
  //     },
  //     err => {
  //       this.errorMessage = err.error.message;
  //       this.isRegisterFailed = true;
  //     }
  //   );
  // }

  // loadPage(): void {
  //   window.location.href="/employees";
  // }
  
}
