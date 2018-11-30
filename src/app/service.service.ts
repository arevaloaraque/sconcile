import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  API_URL  =  'https://devsconcile.apps-lapaymentgroup.com';

  constructor(
    private httpClient: HttpClient
  ) { }

  login(){
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let options = {
      headers: httpHeaders
    };

    return this.httpClient.post(
        "https://devsconcile.apps-lapaymentgroup.com/auth/login/",
        {
            "username": "kumbhani",
            "password": "kumbhani"
        },
        options);
  }

}
