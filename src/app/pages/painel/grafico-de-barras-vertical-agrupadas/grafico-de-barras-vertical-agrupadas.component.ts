import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraficosService } from 'src/app/services/graficos.service';
import { multi } from './data';

@Component({
  selector: 'vex-grafico-de-barras-vertical-agrupadas',
  templateUrl: './grafico-de-barras-vertical-agrupadas.component.html',
  styleUrls: ['./grafico-de-barras-vertical-agrupadas.component.scss'],
})

export class GraficoDeBarrasVerticalAgrupadasComponent implements OnInit{
  multi: any[];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Produtos';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Vendas';
  legendTitle: string = 'Produtos';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };

  constructor(private graficoService: GraficosService) {
    Object.assign(this, { multi });
  }

  ngOnInit(): void {
		this.graficoService.mockoonVerticalAgrupado().subscribe(response => {
			this.multi = response.body
      console.log('batatinha');
      
			return this.multi;
		})
	}


}