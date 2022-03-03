import { Agendamento } from '../../../_models/agendamento';
import { MatTableDataSource } from '@angular/material/table';
import { AgendamentoService } from '../../../services/agendamento.service';
import { Component,  LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
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
import { EventEmitterService } from 'src/app/services/event.service';

import { ModalDeletarAgendamento } from '../../modais/agendamento-modais/modal-deletar/modal-deletar-agendamento';
import { ModalAlterarStatusAgendamento } from '../../modais/agendamento-modais/modal-alterar-status/modal-alterar-status-agendamento';
import { ModalCadastrarEditarAgendamento } from '../../modais/agendamento-modais/modal-cadastrar-editar/modal-cadastrar-editar-agendamento';

registerLocaleData(localePt);

@Component({
	selector: 'vex-listagem-agendamentos',
	templateUrl: './listagem-agendamentos.component.html',
	styleUrls: ['./listagem-agendamentos.component.scss'],
	providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]

})

export class ListagemAgendamentosComponent implements OnInit {

	//Para a tabela
	dataSource = new MatTableDataSource<Agendamento>()
	displayedColumns: string[] = ['cliente', 'nomeServico', 'tempoEstimado', 'valor', 'dtAtendimento', 'responsavel', 'status', 'acoes'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('select') matSelect: MatSelect;
	@ViewChild(MatSort) matSort: MatSort;
	
	//variaveis
	estabelecimentoID = localStorage.getItem('estabelecimento_ID')
	public carregando = false;
	
	//objetos
	agendamento: Agendamento;
	form: FormGroup;
	
	//listas
	agendamentos: Agendamento[] = []
	status: Status[] = [
		{ value: 'ACEITO', viewValue: 'Aceito' },
		{ value: 'PENDENTE', viewValue: 'Pendente' },
		{ value: 'RECUSADO', viewValue: 'Recusado' },
	];
	selecaoStatus: Status[] = [
		{ value: 'TODOS', viewValue: 'Todos' },
		{ value: 'ACEITO', viewValue: 'Aceito' },
		{ value: 'PENDENTE', viewValue: 'Pendente' },
		{ value: 'RECUSADO', viewValue: 'Recusado' },
	];




	constructor(private router: Router,
		private fb: FormBuilder,
		private agendamentoService: AgendamentoService,
		/* correção de data para Português, importanções feitas no app.module.ts*/
		private snackbar: MatSnackBar, private dateAdapter: DateAdapter<any>,
		public dialog: MatDialog) {
		this.dateAdapter.setLocale('pt-BR');
	}

	ngOnInit(): void {
		EventEmitterService.get('buscar').subscribe(() => this.listar())
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
		this.agendamentoService.filtrar(this.estabelecimentoID, filtro, status, dt_inicial, dt_final).subscribe(resposta => {
			this.agendamentos = resposta.body
			/*renderizando a tabela*/
			this.carregando = false;
			this.dataSource = new MatTableDataSource<Agendamento>(this.agendamentos)
			this.dataSource.paginator = this.paginator;

		})
	}

	alterarStatus(agendamentoId) {
		this.carregando = true;
		this.agendamento = this.agendamentos.find(s => s.id == agendamentoId);

		if (this.agendamento.status == 'PENDENTE') {
			this.agendamento.responsavel = "";
		}

		this.agendamentoService.alterarAgendamento(this.agendamento).subscribe(() => {
			this.snackbar.open(MessagesSnackBar.AGENDAMENTO_STATUS_SUCESSO, 'Close', { duration: 4000 });
			this.carregando = false;
			this.validarFiltro();
		}, (error) => {
			this.snackbar.open(MessagesSnackBar.AGENDAMENTO_STATUS_ERRO, 'Close', { duration: 4000 });
			console.log(error);
		})
	}

	listar() {
		this.carregando = true;
		this.agendamentoService.buscarAgendamentos(this.estabelecimentoID).subscribe(resposta => {
			this.agendamentos = resposta.body
			this.carregando = false;

			this.dataSource = new MatTableDataSource<Agendamento>(this.agendamentos)
			this.dataSource.paginator = this.paginator;
			setTimeout(() => {
				this.dataSource.sort = this.matSort
			});
		}, (error)=>{
			console.log(error);
			this.carregando = false;
		})
	}

	abrirModalTrocaStatus(agendamentoId: number) {

		this.agendamento = this.agendamentos.find(s => s.id == agendamentoId);
		const dialogRef = this.dialog.open(ModalAlterarStatusAgendamento, {
			data: this.agendamento
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.alterarStatus(agendamentoId);
			}
			else {
				this.clearForm();
			}
		});
	}
	
	abrirModalDeletar(agendamentoID) {
		const dialogRef = this.dialog.open(ModalDeletarAgendamento, {
			data: agendamentoID 
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

	abrirModalEditarCadastrar(isCadastrar: boolean, idAgendamento?: number, status?: string) {
		let dialogRef;
		let agendamento = this.agendamentos.find(s => s.id == idAgendamento)

		if (isCadastrar) {
			dialogRef = this.dialog.open(ModalCadastrarEditarAgendamento)
		} else {
			dialogRef = this.dialog.open(ModalCadastrarEditarAgendamento, {
				data: agendamento 
			});
			if (status == "PENDENTE") {
				this.agendamento.responsavel = "";
				console.log(this.agendamento.responsavel)
			}
			else if (status == "ACEITO") {

			}
		}

		dialogRef.afterClosed().subscribe(result => {});


	}

	ngAfterViewInit() {
		this.dataSource.sort = this.matSort;
	}
}

