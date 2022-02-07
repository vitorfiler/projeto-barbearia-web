import { Solicitacao } from './../../_models/solicitacao';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitacaoService } from './../../services/solicitacao.service';
import { Component, Inject, Input, LOCALE_ID, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CadSolicitacao } from 'src/app/_models/cad-solicitacao';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms, stagger60ms } from 'src/@vex/animations/stagger.animation';
import { MatSelect } from '@angular/material/select';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSort } from '@angular/material/sort';
import { Status } from 'src/app/_models/status';
import { EventEmitterService } from 'src/app/services/event.service';
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
	solicitacao: Solicitacao;
	color = "red"

	status: Status[] = [
		{ value: 'ACEITO', viewValue: 'Aceito' },
		{ value: 'PENDENTE', viewValue: 'Pendente' },
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
		EventEmitterService.get('buscar').subscribe(()=>this.listar())
		this.inicializarFiltro();
	}

	clearForm() {
		this.carregando = true
		this.form.reset();
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

		this.solicitacaoService.alterarSolicitacao(this.solicitacao).subscribe(() => {
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

	openEditStatus(solicitacaoId: string, status) {
		console.log(solicitacaoId);

		const dialogRef = this.dialog.open(ModalSelectStatusSolicitacaoComponent);
		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
			if (result) {
				this.alterarStatus(solicitacaoId);
			}
			else {
				this.clearForm();
			}
		});
	}

	openDelete() {
		const dialogRef = this.dialog.open(ModalDeletarSolicitacaoComponent);
		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}

	openModalEditarCadastrar(isCadastrar: boolean, idSolicitacao?: number) {
		let dialogRef;
		let solicitacao = this.solicitacoes.find(s=>s.id== idSolicitacao)
		console.log(solicitacao);
		
		if(isCadastrar){
			dialogRef = this.dialog.open(SolicitacoesModal)
		}else{
			dialogRef = this.dialog.open(SolicitacoesModal, {
				data: { solicitacao: solicitacao }
			});
		}
		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
			if(result){
				this.carregando = true;
			}
		});
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.matSort;
	}
}

@Component({
	selector: 'modal-cadastrar-solicitacao',
	templateUrl: 'solicitacoes-modal.html',
	animations: [
		stagger60ms,
		fadeInUp400ms
	]
})

export class SolicitacoesModal implements OnInit {

	// Valores de campo de Status
	status: any[] = [
		{ value: 'ACEITO', viewValue: 'Aceito' },
		{ value: 'PENDENTE', viewValue: 'Pendente' },
		{ value: 'RECUSADO', viewValue: 'Recusado' },
	];

	solicitacao: Solicitacao = new Solicitacao();

	//   Campo tempo de Serviço
	form: FormGroup;
	idSolicitacao = localStorage.getItem('idSolicitacao');
	legendaBotao = 'Cadastrar';
	estabelecimentoID = 1;
	clienteID = 4;

	constructor(
		private fb: FormBuilder,
		private solicitacaoService: SolicitacaoService,
		private snackbar: MatSnackBar,
		@Optional() @Inject(MAT_DIALOG_DATA) public solicitacaoToEdit: any) {
			this.legendaBotao = solicitacaoToEdit ? 'Alterar' : 'Cadastrar';
	}
	ngOnInit(): void {

		if(this.solicitacaoToEdit){
			this.solicitacao = new Solicitacao(this.solicitacaoToEdit.solicitacao)
		}
		console.log(this.solicitacao);
		
		this.form = this.fb.group({
			nomeServico: ['', Validators.required],
			tempoEstimado: ['', Validators.required],
			valorServico: ['', Validators.required],
			dtAtendimento: ['', Validators.required],
			responsvel: ['', Validators.required],
			status: ['', Validators.required]
		});
	}

	enviarSolicitacao(solicitacao: Solicitacao) {
		solicitacao.clienteID = this.clienteID;
		solicitacao.estabelecimentoID = this.estabelecimentoID;

		solicitacao.id ? this.alterar(solicitacao) : this.cadastrar(solicitacao);
	}

	cadastrar(solicitacao: Solicitacao) {
		let dtAtendimento = this.form.get('dtAtendimento').value
		let mes = (dtAtendimento.getMonth() + 1)
		let dia = dtAtendimento.getDate()
		if(mes < 10){
			mes = "0" + (dtAtendimento.getMonth() + 1)
		}if(dia < 10){
			dia = "0" + dtAtendimento.getDate()
		}
		solicitacao.dtAtendimento = (dtAtendimento.getFullYear() + "-" + mes + "-" + dia);

		// Subscribe
		this.solicitacaoService.cadastrarSolicitacao(solicitacao).subscribe(response => {
			console.log(response);
			EventEmitterService.get('buscar').emit();
			this.snackbar.open(MessagesSnackBar.CADASTRO_SOLICITACAO_SUCESSO, 'Fechar', { duration: 9000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.CADASTRO_SOLICITACAO_ERRO, 'Fechar', { duration: 9000 })
		})
	}

	alterar(solicitacao: Solicitacao) {
		// Subscribe
		this.solicitacaoService.alterarSolicitacao(solicitacao).subscribe(response => {
			console.log(response);
			EventEmitterService.get('buscar').emit();
			this.snackbar.open(MessagesSnackBar.ALTERAÇÃO_SOLICITACAO_SUCESSO, 'Fechar', { duration: 9000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.ALTERAÇÃO_SOLICITACAO_ERRO, 'Fechar', { duration: 9000 })
		})
	}
}

@Component({
	selector: 'modal-select-status-solicitacao',
	templateUrl: 'modal-select-status-solicitacao.html',
})
export class ModalSelectStatusSolicitacaoComponent { }

@Component({
	selector: 'modal-deletar-solicitacao',
	templateUrl: 'modal-deletar-solicitacao.html',
})
export class ModalDeletarSolicitacaoComponent { }
