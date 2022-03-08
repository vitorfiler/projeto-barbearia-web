import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { EventEmitterService } from 'src/app/services/event.service';
import { Agendamento } from 'src/app/_models/agendamento';

@Component({
  selector: 'vex-quickpanel',
  templateUrl: './quickpanel.component.html',
  styleUrls: ['./quickpanel.component.scss']
})
export class QuickpanelComponent implements OnInit {

  diasDaSemana = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
  mesDoAno = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
  
  dataDeHoje = new Date().getDate()+" de "+this.mesDoAno[new Date().getMonth()];
  nomeDia = this.diasDaSemana[new Date().getDay()];
  agendamentosDoDia: Agendamento[] = [];

  estabelecimentoId = localStorage.getItem('estabelecimento_ID')

  constructor(private route: Router, private agendamentoService: AgendamentoService) { }

  ngOnInit() {
    this.buscarAgendamentos()
  }

  mudarRotaAgendamento(agendamentoID: string){
    EventEmitterService.get('grifarAgendamento').emit();
    localStorage.setItem("agendamentoID", agendamentoID)
    this.route.navigate(['/agendamentos'])
    
  }
  buscarAgendamentos(){
    this.agendamentoService.buscarAgendamentosDoDia(this.estabelecimentoId).subscribe(response => {
      this.agendamentosDoDia = response.body;
    },(error)=>{
      console.log(error);
    })
  }
  
}
