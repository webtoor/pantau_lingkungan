import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// WEB
/* let apiUrl = "http://127.0.0.1:8000/"; */
// MOBILE
//let apiUrl = "http://192.168.1.7:8000/";
// Server
let apiUrl = "http://157.245.198.221/public/";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http:HttpClient) {

   }
   isAuthenticated(){
    return localStorage.getItem('userAuth');
  }
   Register(data, type){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
      })
    };
    return this.http.post<any>(apiUrl+type, data, httpOptions)
    .pipe(
      
    );
  }

  Login(data, type): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
      })
    };
    return this.http.post<any>(apiUrl+type, data, httpOptions)
      .pipe(
    
      );
  }

  PostData(data, type, access_token): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
        'Authorization': 'Bearer ' + access_token
      })
    };
    return this.http.post<any>(apiUrl+type, data, httpOptions)
      .pipe(
    
      );
  }
}
