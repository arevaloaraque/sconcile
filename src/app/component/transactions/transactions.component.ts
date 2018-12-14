import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor() { }
  // transactions:[Object];

  ngOnInit() {
    // this.transactions= [
    //   {id: 1, firstname: 'Mary', lastname: 'Taylor', age: 24},
    //   {id: 2, firstname: 'Peter', lastname: 'Smith', age: 18},
    //   {id: 3, firstname: 'Lauren', lastname: 'Taylor', age: 31}
    // ];
  }

}
