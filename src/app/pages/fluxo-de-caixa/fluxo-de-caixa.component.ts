import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vex-fluxo-de-caixa',
  templateUrl: './fluxo-de-caixa.component.html',
  styleUrls: ['./fluxo-de-caixa.component.scss']
})
export class FluxoDeCaixa implements OnInit {

  aba: String = '';
  caixa: boolean = false;
  novaVenda: boolean = true;
  historicoVenda: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  alterarTitulo($event){
    
    switch ($event.index) {
      case 0:
        this.novaVenda = true;
        this.caixa = false;
        this.historicoVenda = false;
        break;
    
      case 1:
        this.novaVenda = false;
        this.caixa = true;
        this.historicoVenda = false;
        break;

      case 2:
        this.novaVenda = false;
        this.caixa = false;
        this.historicoVenda = true;
        break;
      default:
        break;
    }

  }

}
