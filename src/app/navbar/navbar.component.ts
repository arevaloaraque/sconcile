import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  data:object
  ngOnInit() {
    this.data=JSON.parse(localStorage.getItem('currentUser'));
  }

}
