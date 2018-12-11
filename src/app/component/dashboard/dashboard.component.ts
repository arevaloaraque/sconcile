import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  canvas: any;
  ctx: any;

  revenue:any;
  today:any;

  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{
					label: 'Unfilled',
					fill: true,

          backgroundColor: 'rgba(255, 206, 86, 1)',
					borderColor: 'rgba(255, 206, 86, 1)',
          borderDash: [5, 5],
          data: [
						2,4,5,7,8,0,5
					],
				}, {
					label: 'Dashed',
          fill: true,

					backgroundColor: 'rgba(255, 99, 132, 1)',
					borderColor: 'rgba(255, 99, 132, 1)',
					borderDash: [5, 5],
					data: [
						7,9,10,12,13,5,10
					],
				}, {
					label: 'Filled',
          fill: true,

					backgroundColor: 'rgba(54, 162, 235, 1)',
					borderColor: 'rgba(54, 162, 235, 1)',
          borderDash: [5, 5],
          data: [
						10,12,13,15,17,8,15
					],
				}]
			},
			options: {
				responsive: true,
				title: {
					display: false,
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
    });



  }
  ngOnInit() {
  }

}
