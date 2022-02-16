import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit {
  @Input() title = 'Sin titulo';
  @Input() newData: number[] = [350, 450, 100];

  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = [
    'Label 1',
    'Label 2',
    'Label 3',
  ];

  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
        hoverBackgroundColor: ['#8a7de7', '#70c2eb', '#e76386'],
        hoverOffset: [10],
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor() {}
  ngOnInit() {
    this.doughnutChartData.labels = this.doughnutChartLabels;
    this.doughnutChartData.datasets[0].data = this.newData;
  }
}
