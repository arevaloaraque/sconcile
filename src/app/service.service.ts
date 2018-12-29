import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from '../environments/environment';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
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
      this.api+"/auth/login/",
        {
            "username": username,
            "password": password
        },
        options)
        .pipe(map(user=>{
            if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('token', user.token);

            }

          return user;
        },
        error=>{
          console.log('Error',error);
          return error;
        }))
  }
  verify_token(){
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let options = {
      headers: httpHeaders
    };

    return this.httpClient.post<any>(
      this.api+"/auth/verify_token/",
        {
            "token": localStorage.getItem('token')
        },
        options).pipe(map(user=>{
           console.log('user',user);
          return user;
        },
        error=>{
          console.log('error ',error);
          return error;
        }))
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  transaction(){
    this.spinner.show();
    let httpHeaders = new HttpHeaders().set('Authorization','LPG '+ localStorage.getItem('token'));
    // 'Content-Type' : 'application/json',
    // 'Authorization': 'LPG '+ localStorage.getItem('token')
    let headers = {
      headers: httpHeaders
    };
    console.log(httpHeaders)

    return this.httpClient.get<any>(this.api + '/sales', headers).pipe(
      map(data=>{
          this.spinner.hide();
           return data;
      },
      error=>{
        this.spinner.hide();
        console.log('Error ',error);
        return error;
      })
    )
  }

  filter(status_id,sale_method,sale_type){
    console.log(status_id,sale_method,sale_type);
    let query;
    if(status_id){
      query="status_id="+status_id;
    }
    if(sale_method)
    {
      if(status_id){
        query=query+"&sale_method="+sale_method;

      }
      else{
        query="sale_method="+sale_method;
      }
    }
    if(sale_type){
      if(sale_method || status_id){
        query=query+"&sale_type="+sale_type
      }
      else{
        query="sale_type="+sale_type
      }
    }
    console.log('query',query);
    this.spinner.show();
    let httpHeaders = new HttpHeaders().set('Authorization','LPG '+ localStorage.getItem('token'));
    // 'Content-Type' : 'application/json',
    // 'Authorization': 'LPG '+ localStorage.getItem('token')
    let headers = {
      headers: httpHeaders
    };
    console.log(httpHeaders)

    return this.httpClient.get<any>(this.api + '/sales?'+query, headers).pipe(
      map(data=>{
          this.spinner.hide();
           return data;
      },
      error=>{
        this.spinner.hide();
        console.log('Error ',error);
        return error;
      })
    )
  }

  filterDrp(){

    let httpHeaders = new HttpHeaders().set('Authorization','LPG '+ localStorage.getItem('token'));
    // 'Content-Type' : 'application/json',
    // 'Authorization': 'LPG '+ localStorage.getItem('token')
    let headers = {
      headers: httpHeaders
    };
    console.log(httpHeaders)

    return this.httpClient.get<any>(this.api + '/filters/sales_list', headers).pipe(
      map(data=>{
           return data;
      },
      error=>{
        console.log('Error ',error);
        return error;
      })
    )
  }
}