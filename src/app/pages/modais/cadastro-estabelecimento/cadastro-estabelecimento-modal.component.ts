import { Component, OnInit, Optional, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger60ms } from "src/@vex/animations/stagger.animation";
import { EventEmitterService } from "src/app/services/event.service";
import { SolicitacaoService } from "src/app/services/solicitacao.service";
import { MessagesSnackBar } from "src/app/_constants/messagesSnackBar";
import { Solicitacao } from "src/app/_models/solicitacao";

@Component({
	selector: 'cadastro-estabelecimento-modal',
	templateUrl: 'cadastro-estabelecimento-modal.html',
	animations: [
		stagger60ms,
		fadeInUp400ms
	]
})

export class CadastroEstabelecimentoModal implements OnInit {

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
			this.snackbar.open(MessagesSnackBar.CADASTRO_SOLICITACAO_SUCESSO, 'Fechar', { duration: 4000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.CADASTRO_SOLICITACAO_ERRO, 'Fechar', { duration: 4000 })
		})
	}

	alterar(solicitacao: Solicitacao) {
		// Subscribe
		this.solicitacaoService.alterarSolicitacao(solicitacao).subscribe(response => {
			console.log(response);
			EventEmitterService.get('buscar').emit();
			this.snackbar.open(MessagesSnackBar.ALTERAÇÃO_SOLICITACAO_SUCESSO, 'Fechar', { duration: 4000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.ALTERAÇÃO_SOLICITACAO_ERRO, 'Fechar', { duration: 4000 })
		})
	}
}