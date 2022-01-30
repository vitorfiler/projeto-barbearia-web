import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'vex-solicitacoes-reservas',
  templateUrl: './solicitacoes-reservas.component.html',
  styleUrls: ['./solicitacoes-reservas.component.scss']
})
export class SolicitacoesReservasComponent implements OnInit {

  isSolicitacoes: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  trocaTitulo($event){
    console.log($event.index);
    this.isSolicitacoes = $event.index == 0? true : false;
  }
}
