import { Component, OnInit } from '@angular/core';
import { single } from './data';


@Component({
  selector: 'vex-grafico-de-linhas',
  templateUrl: './grafico-de-linhas.component.html',
  styleUrls: ['./grafico-de-linhas.component.scss']
})
export class GraficoDeLinhasComponent implements OnInit {

  
  single: any[];
  public view: any[] = [1000, 400];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = true;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel: "Years";
  public showYAxisLabel = true;
  public yAxisLabel: "Salary";
  public graphDataChart: any[];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],

  }

  

  constructor() {
    Object.assign(this, { single })
   }
  ngOnInit(): void {
    
  }

   
}
  


