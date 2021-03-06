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
  private modals: any[] = [];

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

    return this.httpClient.post<any>(this.api + '/auth/login/', {
          'username': username,
          'password': password
      }, options).pipe(map(user => {
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', user.token);

          }

          return user;
      }, error=>{
        return error;
      }));
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
          return user;
        },
        error=>{
          this.logout();
          return error;
        }))
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  updateUserData(data:any) {
    let httpHeaders = new HttpHeaders().set('Authorization', 'LPG ' + localStorage.getItem('token'));
    let headers = { headers: httpHeaders };

    return this.httpClient.put<any>(this.api + '/rest-auth/user/', data, headers).pipe(map(user => {
        if (user && user.first_name && user.last_name) {
          let userSession = JSON.parse(localStorage.getItem('currentUser'));
          userSession['user']['first_name'] = user.first_name;
          userSession['user']['last_name'] = user.last_name;
          localStorage.setItem('currentUser', JSON.stringify(userSession));
        }

        return true;
      }, error => { return error; }
    ));
  }

  updateUserPassword(data:any) {
    let httpHeaders = new HttpHeaders().set('Authorization', 'LPG ' + localStorage.getItem('token'));
    httpHeaders.set('Content-Type', 'application/json')
    let headers = { headers: httpHeaders };

    return this.httpClient.post<any>(this.api + '/auth/password/change/', data, headers).pipe(map(user => {
        return true;
      }, error => { return error; }
    ));
  }

  transaction(){
    this.spinner.show();
    let httpHeaders = new HttpHeaders().set('Authorization','LPG '+ localStorage.getItem('token'));
    // 'Content-Type' : 'application/json',
    // 'Authorization': 'LPG '+ localStorage.getItem('token')
    let headers = {
      headers: httpHeaders
    };

    return this.httpClient.get<any>(this.api + '/sales', headers).pipe(
      map(data=>{
          this.spinner.hide();
           return data;
      },
      error=>{
        this.spinner.hide();
        return error;
      })
    )
  }
  dateEditFormat(d){
    var dd = new Date(d);
    var mm=dd.getMonth()+1;
    return dd.getFullYear()+'-'+mm+'-'+dd.getDate();
  }

  filter(status,sale_method,sale_type,date){
    let query;
    if(status){
      query="status="+status;
    }
    if(sale_method)
    {
      if(status){
        query=query+"&sale_method="+sale_method;

      }
      else{
        query="sale_method="+sale_method;
      }
    }
    if(sale_type){
      if(sale_method || status){
        query=query+"&sale_type="+sale_type
      }
      else{
        query="sale_type="+sale_type
      }
    }
    if(date){

      var nwdate=date.split('-');
      let gte=this.dateEditFormat(nwdate[0]);
      let lte=this.dateEditFormat(nwdate[1]);

      if(sale_type || sale_method || status ){
        query=query+"&sale_date__date__gte="+gte+"&sale_date__date__lte="+lte
      }
      else{
        query="sale_date__date__gte="+gte+"&sale_date__date__lte="+lte
      }
    }


    this.spinner.show();
    let httpHeaders = new HttpHeaders().set('Authorization','LPG '+ localStorage.getItem('token'));
    // 'Content-Type' : 'application/json',
    // 'Authorization': 'LPG '+ localStorage.getItem('token')
    let headers = {
      headers: httpHeaders
    };

    return this.httpClient.get<any>(this.api + '/sales?'+query, headers).pipe(
      map(data=>{
          this.spinner.hide();
           return data;
      },
      error=>{
        this.spinner.hide();
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

    return this.httpClient.get<any>(this.api + '/filters/sales_list', headers).pipe(
      map(data=>{
           return data;
      },
      error=>{
        return error;
      })
    )
  }

  filterDashboard(){

    let httpHeaders = new HttpHeaders().set('Authorization','LPG '+ localStorage.getItem('token'));
    let headers = {headers: httpHeaders};

    return this.httpClient.get<any>(this.api + '/filters/dashboard', headers).pipe(
      map(data=>{
           return data;
      }, error=>{
        return error;
      })
    )
  }

  dashboard(params){
    let httpHeaders = new HttpHeaders().set('Authorization', 'LPG ' + localStorage.getItem('token'));
    let headers = {headers: httpHeaders, params: params};

    return this.httpClient.get<any>(this.api + '/dashboard_view', headers).pipe(
      map(data => {
        return data;
      },
        error => {
          return error;
        })
    )
  }

  find_sale_payments(sale_id){
    let httpHeaders = new HttpHeaders().set('Authorization', 'LPG ' + localStorage.getItem('token'));
    let headers = {headers: httpHeaders};

    return this.httpClient.get<any>(this.api + '/find_sale_payments/'+sale_id, headers).pipe(
      map(data => {
        return data;
      },
        error => {
          return error;
        })
    )
  }
  reconciliate_sale_payment(sale_id,payment_id){
    let httpHeaders = new HttpHeaders().set('Authorization', 'LPG ' + localStorage.getItem('token'));
    let headers = {headers: httpHeaders};

    return this.httpClient.get<any>(this.api + '/reconciliate_sale_payment/'+sale_id+'/'+payment_id, headers).pipe(
      map(data => {
        return data;
      },
        error => {
          return error;
        })
    )

  }

}