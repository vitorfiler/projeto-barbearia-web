import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';

@Component({
  selector: 'vex-grafico-de-barras-verticais',
  templateUrl: './grafico-de-barras-verticais.component.html',
  styleUrls: ['./grafico-de-barras-verticais.component.scss']
})
export class GraficoDeBarrasVerticaisComponent implements OnInit {

  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    Object.assign(this, { single })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSelect(event) {
    console.log(event);
  }
}