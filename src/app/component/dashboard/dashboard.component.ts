import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dropdownList = [];
  dropdownSettings = {};

  constructor(
    private apiservice: ServiceService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  startEndDate:string;
  total_reconciliated_sales:any = [];
  total_amount_sales:any;
  payment_methods:any;
  total_bank_payments:any;
  submitted2:any;
  bank_accounts:any;
  branches:any;
  branches_filter=[];
  ngAfterViewInit() {
    this.spinner.hide();
    this.loadDashboardData();
    // this.apiservice.dashboard().subscribe(data => {
    //   this.total_reconciliated_sales = data['total_reconciliated_sales'];
    //   this.total_amount_sales = data['total_amount_sales']['total'];
    //   this.payment_methods = data['payment_methods'];
    //   this.total_bank_payments = data['total_bank_payments']['total'];
    //   this.bank_accounts = data['bank_accounts'];
    // },
    //   error => {
    //     console.log('Error', error);
    //   }
    // );

    // var columns_timeline_element = document.getElementById('columns_timeline');
    // // Initialize chart
    // var columns_timeline = echarts.init(columns_timeline_element);

    // // Demo data
    // var dataMap = {};
    // dataMap['dataGDP'] = ({
    //   2014: [16251.93, 11307.28, 24515.76, 11237.55, 14359.88, 22226.7, 10568.83, 12582, 19195.69, 19195.69],
    //   2013: [14113.58, 9224.46, 20394.26, 9200.86, 11672, 18457.27, 8667.58, 10368.6, 17165.98, 41425.48],
    //   2012: [12153.03, 7521.85, 17235.48, 7358.31, 9740.25, 15212.49, 7278.75, 8587, 15046.45, 34457.3],
    //   2011: [11115, 6719.01, 16011.97, 7315.4, 8496.2, 13668.58, 6426.1, 8314.37, 14069.87, 30981.98],
    //   2010: [9846.81, 5252.76, 13607.32, 6024.45, 6423.18, 11164.3, 5284.69, 7104, 12494.01, 26018.48]
    // });
    // dataMap['dataEstate'] = ({
    //   2014: [1074.93, 411.46, 918.02, 224.91, 384.76, 876.12, 238.61, 492.1, 1019.68, 2747.89],
    //   2013: [1006.52, 377.59, 697.79, 192, 309.25, 733.37, 212.32, 391.89, 1002.5, 2600.95],
    //   2012: [1062.47, 308.73, 612.4, 173.31, 286.65, 605.27, 200.14, 301.18, 1237.56, 2025.39],
    //   2011: [844.59, 227.88, 513.81, 166.04, 273.3, 500.81, 182.7, 244.47, 939.34, 1626.13],
    //   2010: [821.5, 183.44, 467.97, 134.12, 191.01, 410.43, 153.03, 225.81, 958.06, 1365.71]
    // });
    // dataMap['dataFinancial'] = ({
    //   2014: [2215.41, 756.5, 746.01, 519.32, 447.46, 755.57, 207.65, 370.78, 2277.4, 2600.11],
    //   2013: [1863.61, 572.99, 615.42, 448.3, 346.44, 639.27, 190.12, 304.59, 1950.96, 2105.92],
    //   2012: [1603.63, 461.2, 525.67, 361.64, 291.1, 560.2, 180.83, 227.54, 1804.28, 1596.98],
    //   2011: [1519.19, 368.1, 420.74, 290.91, 219.09, 455.07, 147.24, 177.43, 1414.21, 1298.48],
    //   2010: [1302.77, 288.17, 347.65, 218.73, 148.3, 386.34, 126.03, 155.48, 1209.08, 1054.25]
    // });

    // // Options
    // columns_timeline.setOption({
    //   // Setup timeline
    //   timeline: {
    //     axisType: 'category',
    //     data: ['2010-01-01', '2011-01-01', '2012-01-01', '2013-01-01', '2014-01-01'],
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     label: {
    //       normal: {
    //         fontFamily: 'Roboto, Arial, Verdana, sans-serif',
    //         fontSize: 11
    //       }
    //     },
    //     autoPlay: false,
    //     playInterval: 3000
    //   },
    //   // Config
    //   options: [{
    //       // Global text styles
    //       textStyle: {
    //         fontFamily: 'Roboto, Arial, Verdana, sans-serif',
    //         fontSize: 13
    //       },

    //       // Chart animation duration
    //       animationDuration: 750,

    //       // Setup grid
    //       grid: {
    //         left: 10,
    //         right: 10,
    //         top: 35,
    //         bottom: 60,
    //         containLabel: true
    //       },

    //       // Add legend
    //       legend: {
    //         data: ['GDP', 'Financial', 'Real Estate'],
    //         itemHeight: 8,
    //         itemGap: 20
    //       },

    //       // Tooltip
    //       tooltip: {
    //         trigger: 'axis',
    //         backgroundColor: 'rgba(0,0,0,0.75)',
    //         padding: [10, 15],
    //         textStyle: {
    //           fontSize: 13,
    //           fontFamily: 'Roboto, sans-serif'
    //         },
    //         axisPointer: {
    //           type: 'shadow',
    //           shadowStyle: {
    //             color: 'rgba(0,0,0,0.025)'
    //           }
    //         }
    //       },

    //       // Horizontal axis
    //       xAxis: [{
    //         type: 'category',
    //         data: ['Paris', 'Budapest', 'Prague', 'Madrid', 'Amsterdam', 'Berlin', 'Bratislava', 'Munich', 'Hague', 'Rome'],
    //         axisLabel: {
    //           color: '#333'
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: '#999'
    //           }
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: '#eee',
    //             type: 'dashed'
    //           }
    //         },
    //         splitArea: {
    //           show: true,
    //           areaStyle: {
    //             color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.019)']
    //           }
    //         }
    //       }],

    //       // Vertical axis
    //       yAxis: [
    //         {
    //           type: 'value',
    //           name: '$',
    //           //max: 53500,
    //           axisLabel: {
    //             color: '#333'
    //           },
    //           axisLine: {
    //             lineStyle: {
    //               color: '#999'
    //             }
    //           },
    //           splitLine: {
    //             show: true,
    //             lineStyle: {
    //               color: '#eee'
    //             }
    //           }
    //         }
    //       ],

    //       // Add series
    //       series: [
    //         {
    //           name: 'GDP',
    //           type: 'bar',
    //           // markLine: {
    //           //   symbol: ['arrow', 'none'],
    //           //   symbolSize: [4],
    //           //   itemStyle: {
    //           //     normal: {
    //           //       lineStyle: { color: 'orange' },
    //           //       barBorderColor: 'orange',
    //           //       label: {
    //           //         position: 'left',
    //           //         formatter: function (params) {
    //           //           return Math.round(params.value);
    //           //         },
    //           //         textStyle: { color: 'orange' }
    //           //       }
    //           //     }
    //           //   },
    //           //   data: [{ type: 'average', name: 'Average' }]
    //           // },
    //           data: dataMap.dataGDP['2010']
    //         },
    //         {
    //           name: 'Financial',
    //           type: 'bar',
    //           data: dataMap.dataGDP['2010']
    //         },
    //         {
    //           name: 'Real Estate',
    //           type: 'bar',
    //           data: dataMap.dataGDP['2010']
    //         },
    //         // {
    //         //   name: 'Financial',
    //         //   yAxisIndex: 1,
    //         //   type: 'bar',
    //         //   data: dataMap.dataFinancial['2010']
    //         // },
    //         // {
    //         //   name: 'Real Estate',
    //         //   yAxisIndex: 1,
    //         //   type: 'bar',
    //         //   data: dataMap.dataEstate['2010']
    //         // }
    //       ]
    //     },

    //     // 2011 data
    //     {
    //       series: [
    //         { data: dataMap.dataGDP['2011'] },
    //         { data: dataMap.dataFinancial['2011'] },
    //         { data: dataMap.dataEstate['2011'] }
    //       ]
    //     },

    //     // 2012 data
    //     {
    //       series: [
    //         { data: dataMap.dataGDP['2012'] },
    //         { data: dataMap.dataFinancial['2012'] },
    //         { data: dataMap.dataEstate['2012'] }
    //       ]
    //     },

    //     // 2013 data
    //     {
    //       series: [
    //         { data: dataMap.dataGDP['2013'] },
    //         { data: dataMap.dataFinancial['2013'] },
    //         { data: dataMap.dataEstate['2013'] }
    //       ]
    //     },

    //     // 2014 data
    //     {
    //       series: [
    //         { data: dataMap.dataGDP['2014'] },
    //         { data: dataMap.dataFinancial['2014'] },
    //         { data: dataMap.dataEstate['2014'] }
    //       ]
    //     }
    //   ]
    // });
  }

  ngOnInit() {
    this.verifyToken();
    this.apiservice.filterDashboard().subscribe(data => {
        console.log('data',data);
        this.branches = data['branches'];
      }, error => {
        console.log('Error', error);
      });
    var date = new Date();
    var last = new Date(date.getTime() - (60 * 24 * 60 * 60 * 1000));
    var sMonth = date.getMonth() + 1;
    var lMonth = last.getMonth() + 1;
    var sDate = sMonth + '/' + date.getDate() + '/' + date.getFullYear();
    var lDate = lMonth + '/' + last.getDate() + '/' + last.getFullYear();
    this.startEndDate= lDate + ' - ' + sDate;

    this.dropdownList = [
      { item_id: 1, value: 'Mumbai' },
      { item_id: 2, value: 'Bangaluru' },
      { item_id: 3, value: 'Pune' },
      { item_id: 4, value: 'Navsari' },
      { item_id: 5, value: 'New Delhi' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onStartDateChange(date){
    this.startEndDate = date;
  }

  filter(){

  }
  verifyToken(){
    this.apiservice.verify_token().subscribe(data => {
        if(data.status == 400){
          this.apiservice.logout();
        }
      }, error => {
        if(error.status == 400){
          this.apiservice.logout();
        }
      }
    )
  }
  loadDashboardData() {
    let params = {
      'branches': this.branches_filter,
      'startEndData': this.startEndDate
    }
    console.log(params);
    console.log('branches_filter',this.branches_filter);
    this.apiservice.dashboard(params).subscribe(data => {
      console.log('data',data);
      this.total_reconciliated_sales = data['total_reconciliated_sales'];
      this.total_amount_sales = data['total_amount_sales']['total'];
      this.payment_methods = data['payment_methods'];
      this.total_bank_payments = data['total_bank_payments']['total'];
      this.bank_accounts = data['bank_accounts'];
    },
      error => {
        console.log('Error', error);
      }
    );
  }
}
