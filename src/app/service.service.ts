import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  api=environment.sconcile_service;
  login(username:string,password:string){

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let options = {
      headers: httpHeaders
    };

    return this.httpClient.post<any>(
      "/auth/login/",
        {
            "username": username,
            "password": password
        },
        options).pipe(map(user=>{
            if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
            }

          return user;
        }))
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
