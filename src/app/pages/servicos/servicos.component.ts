import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vex-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {

  promocoes: boolean = false;
  produtos: boolean = false;
  servicos: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }


  trocaTitulo($event){
    console.log($event.index);
    
    switch ($event.index) {
      case 0:
        this.produtos = false;
        this.promocoes = false;
        this.servicos = true;
        break;
    
      case 1:
        this.promocoes = false;
        this.produtos = true;
        this.servicos = false;
        break;

      case 2:
        this.promocoes = true;
        this.produtos = false;
        this.servicos = false;
        break;
      default:
        break;
    }

  }
}
