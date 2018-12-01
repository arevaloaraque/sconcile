import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  data:object
  ngOnInit() {
    this.data=JSON.parse(localStorage.getItem('currentUser'));
  }

}
