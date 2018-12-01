import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  username:string;
  ngOnInit() {
    this.username=JSON.parse(localStorage.getItem('currentUser')).user.username
  }

}
