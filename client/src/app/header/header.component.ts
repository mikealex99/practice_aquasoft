import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { AuthService } from '../service_controller/auth.service.service';
import { TokenStorageService } from '../service_controller/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  errorMessage = '';
  constructor(private authService: AuthService,private tokenStorage: TokenStorageService, private router: Router) { }
  
  userInfo !: any
  ngOnInit(): void {
    this.userInfo = sessionStorage.getItem('loggedUser');
  }

  signOut(): void{
     
    this.authService.logout().subscribe(data=>{
      console.log(data)
      this.tokenStorage.doLogoutUser()
    })
    
    this.reloadPage()

  }

  reloadPage(): void {
    this.router.navigateByUrl('/login')
  }

}
