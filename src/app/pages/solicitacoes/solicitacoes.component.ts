import { Solicitacao } from './../../_models/solicitacao';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitacaoService } from './../../services/solicitacao.service';
import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CadSolicitacao } from 'src/app/_models/cad-solicitacao';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';

import { MatSort } from '@angular/material/sort';
import { Status } from 'src/app/_models/status';
registerLocaleData(localePt);

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

	estabelecimentoID = '1'
	displayedColumns: string[] = ['cliente', 'nomeServico', 'tempoEstimado', 'valor', 'dtAtendimento', 'responsavel', 'status', 'acoes'];

  dataSource = new MatTableDataSource<Solicitacao>()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('select') matSelect: MatSelect;

	//inserção do decorator Matsort
	@ViewChild(MatSort) matSort: MatSort;

	solicitacoes: Solicitacao[] = []
	solicitacao: Solicitacao = new Solicitacao();
	color = "red"

  status: Status[] = [
    { value: 'PENDENTE', viewValue: 'Pendente' },
    { value: 'ACEITO', viewValue: 'Aceito' },
    { value: 'RECUSADO', viewValue: 'Recusado' },
  ];

  selecaoStatus: Status[] = [
    { value: 'TODOS', viewValue: 'Todos' },
    { value: 'PENDENTE', viewValue: 'Pendente' },
    { value: 'ACEITO', viewValue: 'Aceito' },
    { value: 'RECUSADO', viewValue: 'Recusado' },
  ];

  public carregando = false;

  form: FormGroup;
  constructor(private router: Router,
    private fb: FormBuilder,
    private solicitacaoService: SolicitacaoService,
    /* correção de data para Português, importanções feitas no app.module.ts*/
    private snackbar: MatSnackBar, private dateAdapter: DateAdapter<any>,
    public dialog: MatDialog) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    window.localStorage.setItem('isSolicitacoes', 'true');
    this.inicializarFiltro();
  }

  clearForm() {
    this.form.reset();
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
    this.solicitacao = this.solicitacoes.find(s => s.id == solicitacaoId);

    this.solicitacaoService.alterarSolicitacao( this.solicitacao).subscribe(() => {
      this.snackbar.open(MessagesSnackBar.SOLICITACAO_STATUS_SUCESSO, 'Close', { duration: 4000 });
      this.carregando = false;
      this.validarFiltro();
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
      setTimeout(() => {
				this.dataSource.sort = this.matSort
			});
    })
  }

  openDialog(solicitacaoId: string, status) {
    console.log(solicitacaoId);
    
    const dialogRef = this.dialog.open(ModalSelectStatusSolicitacaoComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.alterarStatus(solicitacaoId);
      }
      else{
        this.clearForm();
      }
    });
  }

  novaSolicitacao() {
    console.log("TESTE");
  }

	ngAfterViewInit() {
		this.dataSource.sort = this.matSort;
	}
}

@Component({
  selector: 'modal-select-status-solicitacao',
  templateUrl: 'modal-select-status-solicitacao.html',
})
export class ModalSelectStatusSolicitacaoComponent {}


@Component({
	selector: 'vex-modal-deletar',
	template: `
	
	<div class="titulo">
	
	<h2>Gostária de cancelar esse serviço?</h2>
	<h1 style="color: red">Atenção!!!</h1>
	</div>

	<div class="buttonDelete">
		<button mat-button color="primary" (click)="deleteSolicitacoes()">Sim</button>
		<button mat-button color="primary">Não</button>
    </div>
	`
	,
	styleUrls: ['./solicitacoes.component.scss']
})
export class ModalDeletarComponents {

	deleteSolicitacoes(){
		console.log("teste");
	}
}