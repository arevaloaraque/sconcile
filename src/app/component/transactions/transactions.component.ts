import { Component, OnInit } from '@angular/core';
// transaction
import { ServiceService } from '../../service.service';
// import { Observable } from 'rxjs/Observable';

import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(
    private apiservice: ServiceService
  ) { }



  // transactions:[Object];
  items;
  filterData;
  userFilter = { auth_code: '' };
  searchText: string;
  status: string = "";
  method: string = "";
  type: string = "";
  filterType: string;
  p: number = 1;
  pageSize: number = 10;
  totalItems: number;

  startEndDate: string;
  filterStatus: any = [];
  filterSales_method: any = [];
  filterSales_type: any = [];

  editItems:any;
  deleteItems:any;

  editSaleType:string;
  editStatus:string;
  editMethod:string;
  date1: Date;

  ngOnInit() {
    this.verifyToken();
    // "03/18/2013 - 03/23/2013"

    var date = new Date();
    var last = new Date(date.getTime() - (15 * 24 * 60 * 60 * 1000));
    var sMonth = date.getMonth() + 1;
    var lMonth = last.getMonth() + 1;
    var sDate = sMonth + '/' + date.getDate() + '/' + date.getFullYear();
    var lDate = lMonth + '/' + last.getDate() + '/' + last.getFullYear();
    this.startEndDate=lDate+' - '+sDate;
    // this.startEndDate="";

    this.apiservice.transaction()
      .subscribe(
        data => {
          console.log('data', data);
          this.items = data.items;
          this.filterData = data.items;
          this.totalItems = data.items.length;
        },
        error => {
          console.log('Error', error);
        });

    this.apiservice.filterDrp()
      .subscribe(
        data => {
          console.log('data', data);
          this.filterStatus = data.status;
          this.filterSales_method = data.sales_method;
          this.filterSales_type = data.sales_type;
        },
        error => {
          console.log('Error', error);
        });
  }

  verifyToken(){
    this.apiservice.verify_token()
    .subscribe(
      data=>{
        if(data.status==400){
          this.apiservice.logout();
        }
      },
      error=>{
        if(error.status==400){
          this.apiservice.logout();
        }
      }
    )
  }

  filter() {
    this.apiservice.filter(this.status,this.method,this.type,this.startEndDate)
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

  onStartDateChange(date){
    this.startEndDate = "";
  }
  onStartDateApply(date){
    this.startEndDate=date;
    console.log('Apply date',date);
  }

  editSels(item){
    console.log('item',item);
    this.editItems=item;
    this.editSaleType=item.sale_type.id;
    this.editStatus=item.status.id;
    this.editMethod=item.sale_method.id;
  }
  deleteSels(i){
    this.deleteItems=i;
  }
  totalPerPage(page) {
    this.pageSize = page;
  }
  editSales(){
    console.log('this.editSaleType',this.editSaleType);
  }
  deleteSales(){
    console.log('Delete me',this.deleteItems);
  }
}
