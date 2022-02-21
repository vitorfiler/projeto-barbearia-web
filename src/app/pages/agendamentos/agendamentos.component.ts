import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'vex-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})
export class AgendamentosComponent implements OnInit {

  isAgendamentos: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  trocaTitulo($event){
    console.log($event.index);
    this.isAgendamentos = $event.index == 0? true : false;
  }
}
