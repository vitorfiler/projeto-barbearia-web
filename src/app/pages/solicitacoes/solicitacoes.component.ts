import { Solicitacao } from './../../_models/solicitacao';
import { MatTableDataSource } from '@angular/material/table';
import { Estabelecimento } from 'src/app/_models/estabelecimento';
import { SolicitacaoService } from './../../services/solicitacao.service';
import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CadSolicitacao } from 'src/app/_models/cad-solicitacao';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { MatSelect } from '@angular/material/select';
import { EventEmitterService } from 'src/app/services/event.service';

registerLocaleData(localePt);

export class DatepickerColorExample { }

export class ModalComponent {
  mostrar: boolean = false;

  toggle() {
    this.mostrar = !this.mostrar;
  }
}

@Component({
  selector: 'vex-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  animations: [
    fadeInUp400ms,
    stagger20ms
  ]

})
export class SolicitacoesComponent implements OnInit {

  estabelecimentoID = localStorage.getItem('estabelecimento_ID');
  displayedColumns: string[] = ['cliente', 'nomeServico', 'tempoEstimado', 'valor', 'dtAtendimento', 'responsavel', 'status'];

  dataSource = new MatTableDataSource<Solicitacao>()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('select') matSelect: MatSelect;
  
  solicitacoes: Solicitacao[] = []
  solicitacao: Solicitacao = new Solicitacao();

  color = "red"

  status: any[] = [
    { value: 'PENDENTE', viewValue: 'Pendente' },
    { value: 'ACEITO', viewValue: 'Aceito' },
    { value: 'RECUSADO', viewValue: 'Recusado' },
  ];

  selecaoStatus: any[] = [
    { value: 'TODOS', viewValue: 'Todos' },
    { value: 'PENDENTE', viewValue: 'Pendente' },
    { value: 'ACEITO', viewValue: 'Aceito' },
    { value: 'RECUSADO', viewValue: 'Recusado' },
  ];

  // selectedStatus: string = this.selecaoStatus[0].value;
  public carregando = false;

  form: FormGroup;
  constructor(private router: Router,
    private fb: FormBuilder,
    private solicitacaoService: SolicitacaoService,
    /* correção de data para Português, importanções feitas no app.module.ts*/
    private snackbar: MatSnackBar, private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    window.localStorage.setItem('isSolicitacoes', 'true');
    this.inicializarFiltro();
  }

  showAlert(){
    alert('teste')
  }
  clearForm(form) {
    form.reset();
    this.carregando = true
    setTimeout(() => {
      this.inicializarFiltro();
    });
  }

  inicializarFiltro() {
    this.form = this.fb.group({
      filtro: [''],
      status: [this.selecaoStatus[0].value],
      dt_inicial: [''],
      dt_final: [''],
    });
    this.listar();
  }

  validarFiltro() {

    let filtro = this.form.get('filtro').value
    let status = this.form.get('status').value
    let dt_inicial = this.form.get('dt_inicial').value
    let dt_final = this.form.get('dt_final').value


    if (dt_inicial && dt_final) {

      if (dt_inicial > dt_final) {
        this.snackbar.open("Insira uma data final maior que inicial", 'Ok', { duration: 4000 });
        return;
      }
      dt_inicial = (dt_inicial.getFullYear() + "-" + ((dt_inicial.getMonth() + 1)) + "-" + (dt_inicial.getDate()));
      dt_final = (dt_final.getFullYear() + "-" + ((dt_final.getMonth() + 1)) + "-" + (dt_final.getDate()));
      this.filtrar(filtro, status, dt_inicial, dt_final);
    }
    else {
      this.filtrar(filtro, status, dt_inicial, dt_final);
    }
  }

  filtrar(filtro: string, status: string, dt_inicial: string, dt_final) {
    this.carregando = true;
    this.solicitacaoService.filtrar(this.estabelecimentoID, filtro, status, dt_inicial, dt_final).subscribe(resposta => {
      this.solicitacoes = resposta.body
      /*renderizando a tabela*/
      this.carregando = false;
      this.dataSource = new MatTableDataSource<Solicitacao>(this.solicitacoes)
      this.dataSource.paginator = this.paginator;
    })
  }

  alterarStatus(solicitacaoId) {
    this.carregando = true;
    let solicitacao = new CadSolicitacao();
    this.solicitacao = this.solicitacoes.find(s => s.id == solicitacaoId);

    delete this.solicitacao.cliente
    solicitacao = this.solicitacao;
    this.solicitacaoService.alterarSolicitacao(solicitacao).subscribe(() => {
      this.snackbar.open(MessagesSnackBar.SOLICITACAO_STATUS_SUCESSO, 'Close', { duration: 4000 });
      this.carregando = false;
      this.listar();
    }, (error) => {
      this.snackbar.open(MessagesSnackBar.SOLICITACAO_STATUS_ERRO, 'Close', { duration: 4000 });
      console.log(error);
    })
  }

  listar() {
    this.carregando = true;
    this.solicitacaoService.getSolicitacoes(this.estabelecimentoID).subscribe(resposta => {
      this.solicitacoes = resposta.body
      this.carregando = false;

      this.dataSource = new MatTableDataSource<Solicitacao>(this.solicitacoes)
      this.dataSource.paginator = this.paginator;
    })
  }

  novaSolicitacao() {
    
    EventEmitterService.get('mostra-load').emit();
    console.log("TESTE");
  }

}
