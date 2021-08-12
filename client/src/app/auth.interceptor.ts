import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './service_controller/auth.service.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { TokenStorageService } from './service_controller/token-storage.service';
import { Router } from '@angular/router';
  
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router,public authService: AuthService,private tokenStorage: TokenStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // set token authorization
    if (this.tokenStorage.getJwtKey()) {
      request = this.addToken(request, this.tokenStorage.getJwtKey());
    }
      setTimeout(()=>{
        this.tokenStorage.getJwtKey()
      },10 * 60 * 1000) //10m

    // get other refreshToken
    let refreshtoken = this.tokenStorage.getRefreshToken()

    // handle exp of token -- else router to login
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse && error.status === 400 && this.tokenStorage.getRefreshToken()) {
        this.tokenStorage.saveToken(refreshtoken)
        request.clone(
          { setHeaders: {
             Authorization: refreshtoken
           }}
         );
        return throwError(error)
      } else {
        this.router.navigate(['/login'])
        this.tokenStorage.removeTokens()
        return throwError(error)
      }
    }));
  }

  // set authorization token
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone(
     { setHeaders: {
        Authorization: token
      }}
    );
  }

}