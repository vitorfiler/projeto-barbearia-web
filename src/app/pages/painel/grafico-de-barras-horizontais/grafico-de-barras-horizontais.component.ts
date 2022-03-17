import { Component, OnInit } from '@angular/core';
import { GraficosService } from 'src/app/services/graficos.service';

@Component({
	selector: 'vex-grafico-de-barras-horizontais',
	templateUrl: './grafico-de-barras-horizontais.component.html',
	styleUrls: ['./grafico-de-barras-horizontais.component.scss']
})


export class GraficoDeBarrasHorizontaisComponent implements OnInit {
	single = []
	view: any[] = [700, 400];

	// options
	showXAxis: boolean = true;
	showYAxis: boolean = true;
	gradient: boolean = false;
	showLegend: boolean = true;
	showXAxisLabel: boolean = true;
	yAxisLabel: string = 'Serviços';
	showYAxisLabel: boolean = true;
	xAxisLabel: string = 'Quantidade/Dia';
	showGridLines: boolean = false;
	barPadding: number = 2;
	colorScheme = {
		domain: ['#006fe2', '#cadede', '#c8d5ff', '#214377', '#000000']
	};

	constructor(private graficoService: GraficosService) {
	}

	ngOnInit(): void {
		this.graficoService.dadosGrafico().subscribe(response => {
			this.single = response.body
			console.log(this.single)
			return this.single;
		})
	}

	onSelect(data: any): void {
		console.log('Item clicked', JSON.parse(JSON.stringify(data)));
	}

}
