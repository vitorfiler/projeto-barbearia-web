import { Solicitacao } from './../../_models/solicitacao';
import { MatTableDataSource } from '@angular/material/table';
import { Estabelecimento } from 'src/app/_models/estabelecimento';
import { SolicitacaoService } from './../../services/solicitacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CadSolicitacao } from 'src/app/_models/cad-solicitacao';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';

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
		{ value: 'PENDENTE', viewValue: 'Pendente' },
		{ value: 'ACEITO', viewValue: 'Aceito' },
		{ value: 'RECUSADO', viewValue: 'Recusado' },
	];

	form: FormGroup;
	constructor(private router: Router,
		private fb: FormBuilder,
		private solicitacaoService: SolicitacaoService,
		private snackbar: MatSnackBar) { }

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
		}, (error)=>{
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

}
