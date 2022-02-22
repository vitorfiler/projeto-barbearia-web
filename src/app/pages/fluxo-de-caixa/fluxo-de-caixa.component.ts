import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vex-fluxo-de-caixa',
  templateUrl: './fluxo-de-caixa.component.html',
  styleUrls: ['./fluxo-de-caixa.component.scss']
})
export class FluxoDeCaixa implements OnInit {

  aba: String = '';
  caixa: boolean = false;
  novaVenda: boolean = false;
  historicoVenda: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  alterarTitulo($event){
    
    switch ($event.index) {
      case 0:
        this.historicoVenda = false;
        this.novaVenda = false;
        this.caixa = true;
        break;
    
      case 1:
        this.caixa = false;
        this.novaVenda = true;
        this.historicoVenda = false;
        break;

      case 2:
        this.historicoVenda = true;
        this.caixa = false;
        this.novaVenda = false;
        break;
      default:
        break;
    }

  }

}
