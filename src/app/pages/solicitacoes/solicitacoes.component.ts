import { Solicitacao } from './../../_models/solicitacao';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitacaoService } from './../../services/solicitacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CadSolicitacao } from 'src/app/_models/cad-solicitacao';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';

@Component({
	selector: 'vex-solicitacoes',
	templateUrl: './solicitacoes.component.html',
	styleUrls: ['./solicitacoes.component.scss']
})

export class SolicitacoesComponent implements OnInit {

	estabelecimentoID = '1'
	displayedColumns: string[] = ['cliente', 'nomeServico', 'tempoEstimado', 'valor', 'dtAtendimento', 'responsavel', 'status'];

	dataSource = new MatTableDataSource<Solicitacao>()
	@ViewChild(MatPaginator) paginator: MatPaginator;

	solicitacoes: Solicitacao[] = []
	solicitacao: Solicitacao = new Solicitacao();
	color = "red"
	status: any[] = [
		{ value: 'ACEITO', viewValue: 'Aceito' },
		{ value: 'PENDENTE', viewValue: 'Pendente' },
		{ value: 'RECUSADO', viewValue: 'Recusado' },
	];

	form: FormGroup;
	constructor(private router: Router,
		private fb: FormBuilder,
		private solicitacaoService: SolicitacaoService,
		private snackbar: MatSnackBar,
		public dialog: MatDialog) { }

	ngOnInit(): void {
		window.localStorage.setItem('isSolicitacoes', 'true');
		this.form = this.fb.group({
			filtro: [''],
		});

		this.listar()
	}

	filtrar() {
		let filtro = this.form.get('filtro').value

		this.solicitacaoService.filtrar(this.estabelecimentoID, filtro).subscribe(resposta => {
			this.solicitacoes = resposta.body
			/*renderizando a tabela*/

			this.dataSource = new MatTableDataSource<Solicitacao>(this.solicitacoes)
			this.dataSource.paginator = this.paginator;
		})
	}

	alterarStatus(solicitacaoId) {
		let solicitacao = new CadSolicitacao();
		this.solicitacao = this.solicitacoes.find(s => s.id == solicitacaoId);

		delete this.solicitacao.cliente
		solicitacao = this.solicitacao;

		this.solicitacaoService.alterarSolicitacao(solicitacao).subscribe(() => {
			this.snackbar.open(MessagesSnackBar.SOLICITACAO_STATUS_SUCESSO, 'Close', { duration: 4000 });
			this.filtrar();
		}, (error) => {
			this.snackbar.open(MessagesSnackBar.SOLICITACAO_STATUS_ERRO, 'Close', { duration: 4000 });
			console.log(error);
		})
	}

	listar() {
		this.solicitacaoService.getSolicitacoes(this.estabelecimentoID).subscribe(resposta => {
			this.solicitacoes = resposta.body

			this.dataSource = new MatTableDataSource<Solicitacao>(this.solicitacoes)
			this.dataSource.paginator = this.paginator;

		})
	}

	openDialog() {
		const dialogRef = this.dialog.open(SolicitacoesModal);

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}
}

@Component({
	selector: 'solicitacoes-modal.html',
	templateUrl: 'solicitacoes-modal.html',

	animations: [
		stagger60ms,
		fadeInUp400ms
	]
})

export class SolicitacoesModal implements OnInit {

	solicitacao: Solicitacao = new Solicitacao();

	// Valores de campo de Status
	status: any[] = [
		{ value: 'ACEITO', viewValue: 'Aceito' },
		{ value: 'PENDENTE', viewValue: 'Pendente' },
		{ value: 'RECUSADO', viewValue: 'Recusado' },
	];

	//   Campo tempo de Serviço
	form: FormGroup;
	
	constructor(
		private fb: FormBuilder,
		private solicitacaoService: SolicitacaoService,
		private snackbar: MatSnackBar) {

	}
	ngOnInit(): void {
	// Capturando dados dos campos
		this.form = this.fb.group({
			nomeServico: ['', Validators.required],
			tempoEstimado: ['', Validators.required],
			valorServico: ['', Validators.required],
			dtAtendimento: ['', Validators.required],
			responsvel: ['', Validators.required],
			status: ['', Validators.required]
		});

	}
	cadastrarSolicitacao(solicitacao: CadSolicitacao) {
		console.log(solicitacao);
		solicitacao.dtAtendimento = "1995-07-03"
		solicitacao.clienteID = 1;
		solicitacao.estabelecimentoID = 1;

		// Subscribe
		this.solicitacaoService.cadastrarSolicitacao(solicitacao).subscribe(response => {
			console.log(response);
			this.snackbar.open(MessagesSnackBar.CADASTRO_SOLICITACAO_SUCESSO, 'Fechar', { duration: 9000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.CADASTRO_SOLICITACAO_ERRO, 'Fechar', { duration: 9000 })
		})
	}
}







