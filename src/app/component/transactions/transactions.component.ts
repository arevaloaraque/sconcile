import { Component, OnInit } from '@angular/core';
// transaction
import {ServiceService} from '../../service.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(
    private apiservice:ServiceService,
    private http:HttpClient
  ) { }
  // transactions:[Object];
  items;
  filterData;
  userFilter ={  auth_code: '' };
  searchText : string;
  p: number = 1;
  pageSize:number=10;
  totalItems:number;
  ngOnInit() {
    this.apiservice.transaction()
    .subscribe(
      data => {
        console.log('data',data);
        this.items=data.items;
        this.filterData=data.items;
        this.totalItems=data.items.length;
      },
      error => {
          console.log('Error',error);
      });

    }


    search(term) {
      if(!term) {
        this.items = this.filterData;
      } else {
        this.items = this.filterData.filter(x =>
           x.auth_code.trim().toLowerCase().includes(term.trim().toLowerCase())
        );
      }
    }

    totalPerPage(page){
      this.pageSize=page;
    }
}
