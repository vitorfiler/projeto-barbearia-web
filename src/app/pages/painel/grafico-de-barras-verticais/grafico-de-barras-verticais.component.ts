import { Component, NgModule, OnInit } from '@angular/core';
import { GraficosService } from 'src/app/services/graficos.service';

@Component({
  selector: 'vex-grafico-de-barras-verticais',
  templateUrl: './grafico-de-barras-verticais.component.html',
  styleUrls: ['./grafico-de-barras-verticais.component.scss']
})
export class GraficoDeBarrasVerticaisComponent implements OnInit {

  single: any[];

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

  constructor(private graficoService : GraficosService) {
  }
  ngOnInit(): void {
    this.graficoService.dadosGraficoVertical().subscribe(response => {
			this.single = response.body
			return this.single;
		})
  }

  onSelect(event) {
    console.log(event);
  }
}
