import { Component, OnInit, AfterViewInit, Optional, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger60ms } from "src/@vex/animations/stagger.animation";
import { ClientesService } from "src/app/services/clientes.service";
import { EventEmitterService } from "src/app/services/event.service";
import { AgendamentoService } from "src/app/services/agendamento.service";
import { MessagesSnackBar } from "src/app/_constants/messagesSnackBar";
import { Cliente } from "src/app/_models/cliente";
import { Agendamento } from "src/app/_models/agendamento";

@Component({
	selector: 'modal-cadastrar-editar-agendamento',
	templateUrl: 'modal-cadastrar-editar-agendamento.html',
	animations: [
		stagger60ms,
		fadeInUp400ms
	]
})

export class ModalCadastrarEditarAgendamento implements OnInit,AfterViewInit  {

	// Valores de campo de Status
	status: any[] = [
		{ value: 'ACEITO', viewValue: 'Aceito' },
		{ value: 'PENDENTE', viewValue: 'Pendente' },
		{ value: 'RECUSADO', viewValue: 'Recusado' },
	];

	agendamento: Agendamento = new Agendamento();
	form: FormGroup;
	legendaBotao = 'Cadastrar';
	estabelecimentoID = localStorage.getItem('estabelecimento_ID');
	cliente = new Cliente();
	clientes = this.buscarClientesAtivos();
	filteredOptions: Observable<Cliente[]>;
	myControl = new FormControl();
	public carregando = false;
	textoAutoComplete = '';


	constructor(
		private fb: FormBuilder,
		private agendamentoService: AgendamentoService,
		private clientesService: ClientesService,
		private snackbar: MatSnackBar,
		@Optional() @Inject(MAT_DIALOG_DATA) public alterarAgendamento: any) {
		this.legendaBotao = alterarAgendamento ? 'Alterar' : 'Cadastrar';
	}
	
	ngOnInit(): void {

		this.filteredOptions = this.myControl.valueChanges
		.pipe(
		  startWith(''),
		  map(value => this._filter(value))
		);

		if (this.alterarAgendamento) {
			this.agendamento = new Agendamento(this.alterarAgendamento)
		}

		this.form = this.fb.group({
			nomeServico: ['', Validators.required],
			tempoEstimado: ['', Validators.required],
			valorServico: ['', Validators.required],
			dtAtendimento: ['', Validators.required],
			responsavel: [''],
			cliente: ['', Validators.required],
			status: ['']
		});
	}

	getTitle(clienteId) {
		if (!clienteId) return '';

		if(this.clientes){
			return this.clientes?.find(cliente => cliente?.id === clienteId)?.nome;
		}
	}
	filtrarClientes(){
		this.carregando = true

		let filtro = this.form.get('cliente').value
		this.clientesService.filtrarCliente(filtro).subscribe(response =>{
			this.clientes = response.body
			this.carregando = false;
			this.filteredOptions = this.myControl.valueChanges
			.pipe(
			  startWith(''),
			  map(value => this._filter(value))
			);
			
		}, (error)=>{
			this.carregando = false;
			console.log(error);
		})
	}

	buscarClientesAtivos(): any{
		this.carregando = true
		this.clientesService.buscarClientesAtivos().subscribe(response =>{
			this.carregando = false;
			this.clientes = response.body
			return this.clientes;
		}, (error)=>{
			this.carregando = false;
			console.log(error);
		})
	}

	private _filter(value: string): Cliente[] {
		if (typeof value === "string") {
			// do something
			if(this.clientes == undefined) return;
			if (value == undefined) return this.clientes;
			return this.clientes.filter(x => x.nome.toLowerCase().includes(value.toLowerCase()));
		}
	  }
	
	  private _filterById(value: number): Cliente {
		if(this.clientes == undefined) return;
		if (value == undefined) return this.clientes;
		return this.clientes.filter(x => x.id == value);
	  }

	  enviarAgendamento(agendamento: Agendamento) {
		agendamento.clienteID = this.form.get('cliente').value;
		agendamento.estabelecimentoID = +this.estabelecimentoID;
		
		// Regra do campo status

		if(agendamento.responsavel){
			agendamento.status = "Aceito"
		}
		else{
			agendamento.status = "Pendente"
		}
		agendamento.id ? this.alterar(agendamento) : this.cadastrar(agendamento);
	}

	cadastrar(agendamento: Agendamento) {

		let dtAtendimento = this.form.get('dtAtendimento').value
		let mes = (dtAtendimento.getMonth() + 1)
		let dia = dtAtendimento.getDate()
		if (mes < 10) {
			mes = "0" + (dtAtendimento.getMonth() + 1)
		} if (dia < 10) {
			dia = "0" + dtAtendimento.getDate()
		}
		agendamento.dtAtendimento = (dtAtendimento.getFullYear() + "-" + mes + "-" + dia);
		
		// Subscribe
		this.agendamentoService.cadastrarAgendamento(agendamento).subscribe(response => {
			EventEmitterService.get('buscar').emit();
			this.snackbar.open(MessagesSnackBar.CADASTRO_AGENDAMENTO_SUCESSO, 'Fechar', { duration: 4000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.CADASTRO_AGENDAMENTO_ERRO, 'Fechar', { duration: 4000 })
		})
	}

	alterar(agendamento: Agendamento) {
		// Subscribe
		this.agendamentoService.alterarAgendamento(agendamento).subscribe(response => {
			EventEmitterService.get('buscar').emit();
			this.snackbar.open(MessagesSnackBar.ALTERAÇÃO_AGENDAMENTO_SUCESSO, 'Fechar', { duration: 4000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.ALTERAÇÃO_AGENDAMENTO_ERRO, 'Fechar', { duration: 4000 })
		})
	}

	limparStatus(agendamentoResponsavel: String){

		agendamentoResponsavel? this.agendamento.status = "ACEITO" : this.agendamento.status = "PENDENTE";

	}

	ngAfterViewInit(): void {
		this.filteredOptions = this.myControl.valueChanges
		.pipe(
		  startWith(''),
		  map(value => this._filter(value))
		);
	}

}
