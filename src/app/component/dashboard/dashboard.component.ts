import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  startEndDate:string;
  canvas: any;
  ctx: any;

  canvas1:any;
  ctx1:any;

  revenue:any;
  today:any;

  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: '',
                  backgroundColor: '#920909',
                  borderColor: '#1E88E5',
                  data: [63, 58, 82, 81, 56, 55, 41]
              },
              {
                  label: '',
                  backgroundColor: '#04033b',
                  borderColor: '#7CB342',
                  data: [27, 49, 45, 19, 87, 28, 90]
              },
              {
                label: '',
                backgroundColor: '#0c6790',
                borderColor: '#7CB342',
                data: [2, 50, 40, 29, 80, 27, 40]
              },

          ]
      },
      options: {
        responsive: false,
        display:true,
        scales: {
          yAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        }
      }
    });

    this.canvas1 = document.getElementById('myChart1');
    this.ctx1 = this.canvas1.getContext('2d');
    let myChart1 = new Chart(this.ctx1, {
      type: 'bar',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: '',
                  backgroundColor: '#920909',
                  borderColor: '#1E88E5',
                  data: [63, 58, 82, 81, 56, 55, 41]
              },
              {
                  label: '',
                  backgroundColor: '#04033b',
                  borderColor: '#7CB342',
                  data: [27, 49, 45, 19, 87, 28, 90]
              },
              {
                label: '',
                backgroundColor: '#0c6790',
                borderColor: '#7CB342',
                data: [2, 50, 40, 29, 80, 27, 40]
              },
          ]
      },
      options: {
        responsive: false,
        display:true,
        scales: {
          yAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        }
      }
    });



  }
  ngOnInit() {

    var date = new Date();
    var last = new Date(date.getTime() - (15 * 24 * 60 * 60 * 1000));
    var sMonth = date.getMonth() + 1;
    var lMonth = last.getMonth() + 1;
    var sDate = sMonth + '/' + date.getDate() + '/' + date.getFullYear();
    var lDate = lMonth + '/' + last.getDate() + '/' + last.getFullYear();
    this.startEndDate=lDate+' - '+sDate;
  }

  onStartDateChange(date){
    this.startEndDate = date;
  }
}
