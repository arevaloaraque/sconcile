import { Component, OnInit } from '@angular/core';
// transaction
import {ServiceService} from '../../service.service';
// import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(
    private apiservice:ServiceService
  ) { }



  // transactions:[Object];
  items;
  filterData;
  userFilter ={  auth_code: '' };
  searchText : string;
  status:string="";
  method:string="";
  type:string="";
  filterType:string;
  p: number = 1;
  pageSize:number=10;
  totalItems:number;

  filterStatus:any=[];
  filterSales_method:any=[];
  filterSales_type:any=[];

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
        // this.spinner.hide();
          console.log('Error',error);
      });

    this.apiservice.filterDrp()
      .subscribe(
        data=>{
          console.log('data',data);
          this.filterStatus=data.status;
          this.filterSales_method=data.sales_method;
          this.filterSales_type=data.sales_type;
        },
        error=>{
          console.log('Error',error);
        }
      )


    }
    filter(){
      this.apiservice.filter(this.status,this.method,this.type)
        .subscribe(
          data=>{
            this.items=data.items;
            this.filterData=data.items;
            this.totalItems=data.items.length;
          },
          error=>{
            console.log('error',error);
          }
        )
    }

    totalPerPage(page){
      this.pageSize=page;
    }
}
