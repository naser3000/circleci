import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  chart = [];

  createChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['s1', 's2', 's3'],
        datasets: [
          { 
            data: [2, 8, 56, 31],
            borderColor: "#3cba9f",
            fill: false
          },
          { 
            data: [12, 45, 67, 36],
            borderColor: "#ffcc00",
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  ngOnInit() {
    this.createChart();
  }

}
