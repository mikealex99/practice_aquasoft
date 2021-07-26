import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiProjectService {

// Node/Express API
 REST_API: string = 'http://localhost:9999/projects';

// Http Header
   httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

// adauga un angajat nou
  addProject(data : any){
    let API_URL = `${this.REST_API}/add`;

    return this.http.post<any>(API_URL, data)
    .pipe(map((res : any)=>{
      return res
    }))
  }

// Get all objects
  getProjects() {
      return this.http.get(`${this.REST_API}/list`);
  }

// Get single object
  getProject(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/listById/${id}`;
    return this.http.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

// Update project
  updateProj(data: any, id: number): Observable<any> {
      let API_URL = `${this.REST_API}/edit/${id}`;
      return this.http.put(API_URL, data, { headers: this.httpHeaders })
        .pipe(map((res: any)=>{
          return res
        })
        )
  }

// Delete project
  deleteProject(id: any): Observable<any> {
      let API_URL = `${this.REST_API}/remove/${id}`;
      return this.http.delete(API_URL, { headers: this.httpHeaders}).pipe(
          catchError(this.handleError)
        )
  }

// Error 
  handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Handle client error
        errorMessage = error.error.message;
      } else {
        // Handle server error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }
}
