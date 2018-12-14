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
  userFilter: any = { auth_code: '' , amount:''};
  ngOnInit() {
    this.getJSON().subscribe(data => {
      console.log(data)
      this.items=data.items;
      this.filterData=data.items;
    });

    this.apiservice.transaction()
    .subscribe(
      data => {
        console.log('data',data);
      },
      error => {
          console.log('Error',error);
      });

    }

    public getJSON(): Observable<any> {
      return this.http.get("./assets/response.json")
    }

    search(term) {
      if(!term) {
        this.items = this.filterData;
      } else {
        this.items = this.filterData.filter(x =>
          // console.log('x',x)
           x.auth_code.trim().toLowerCase().includes(term.trim().toLowerCase())
        );
      }
    }
}
