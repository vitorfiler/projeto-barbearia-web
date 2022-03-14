import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';

@Component({
  selector: 'vex-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {

  graficoPizza: boolean = true;
  graficoHorizontal: boolean = false;
  graficoVertical: boolean = false;
  graficoLinhas: boolean = false;
  graficoVerticalAgrupado: boolean = false;

  constructor() { }

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
  alterarTitulo($event) {
    switch ($event.index) {
      case 0:
        this.graficoPizza = true;
        this.graficoVertical = false;
        this.graficoHorizontal = false;
        this.graficoLinhas = false;
        this.graficoVerticalAgrupado = false;
        break;

      case 1:
        this.graficoPizza = false;
        this.graficoVertical = true;
        this.graficoHorizontal = false;
        this.graficoLinhas = false;
        this.graficoVerticalAgrupado = false;
        break;


      case 2:
        this.graficoPizza = false;
        this.graficoVertical = false;
        this.graficoHorizontal = true;
        this.graficoLinhas = false;
        this.graficoVerticalAgrupado = false;

        break;
      case 3:
        this.graficoPizza = false;
        this.graficoVertical = false;
        this.graficoHorizontal = false;
        this.graficoLinhas = true;
        this.graficoVerticalAgrupado = false;

        break;

      case 4:
        this.graficoPizza = false;
        this.graficoVertical = false;
        this.graficoHorizontal = false;
        this.graficoLinhas = false;
        this.graficoVerticalAgrupado = true;
        break;


      default:
        break;
    }

  }


  onSelect(event) {
    console.log(event);
  }
}