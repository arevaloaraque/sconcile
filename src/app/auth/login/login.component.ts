import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceService} from '../../service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private myRoute: Router,
    private apiservice:ServiceService) { }



  ngOnInit() {
  }

  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.myRoute.navigate(["login"]);
  }

  // username: string, password: string
  loginMe(){
    console.log('login me');
    this.apiservice.login()
    .subscribe((data) => console.log('data',data));
   }
}

