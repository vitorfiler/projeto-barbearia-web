import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
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


}
