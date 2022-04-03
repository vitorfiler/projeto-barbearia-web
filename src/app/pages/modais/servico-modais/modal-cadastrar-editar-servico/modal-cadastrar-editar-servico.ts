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
import { Servico } from "src/app/_models/servico";
import { ServicoService } from "src/app/services/servico.service";

@Component({
	selector: 'modal-cadastrar-editar-servico',
	templateUrl: 'modal-cadastrar-editar-servico.html',
	animations: [
		stagger60ms,
		fadeInUp400ms
	]
})

export class ModalCadastrarEditarServico implements OnInit, AfterViewInit {

	form: FormGroup;
	legendaBotao = 'Cadastrar';
	estabelecimentoID = localStorage.getItem('estabelecimento_ID');
	servico = new Servico();
	constructor(
		private fb: FormBuilder,
		private snackbar: MatSnackBar,
		@Optional() @Inject(MAT_DIALOG_DATA) public alterarServico: any,
		private servicoService: ServicoService) {
		this.legendaBotao = alterarServico ? 'Alterar' : 'Cadastrar';
	}

	ngOnInit(): void {

		if (this.alterarServico) {
			this.servico = new Servico(this.alterarServico)
		}

		this.form = this.fb.group({
			nome: ['', Validators.required],
			tempoEstimado: ['', Validators.required],
			categoria: ['', Validators.required],
			descricao: ['', Validators.required],
			promocional: [''],
			valor: ['', Validators.required],
			valorPromocional: ['', Validators.required],
		});
	}


	enviarServico(servico: Servico) {
		servico.estabelecimentoID = +this.estabelecimentoID;

		servico.id ? this.alterar(servico) : this.cadastrar(servico);
	}

	cadastrar(servico: Servico) {
		this.servicoService.cadastrar(servico).subscribe(response => {
			EventEmitterService.get('buscarServicos').emit();
			this.snackbar.open(MessagesSnackBar.CADASTRO_SERVICO_SUCESSO, 'Fechar', { duration: 4000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.CADASTRO_SERVICO_ERRO, 'Fechar', { duration: 4000 })
		})
	}

	alterar(servico: Servico) {
		this.servicoService.alterarAgendamento(servico).subscribe(response => {
			EventEmitterService.get('buscarServicos').emit();
			this.snackbar.open(MessagesSnackBar.ALTERACAO_SERVICO_SUCESSO, 'Fechar', { duration: 4000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.ALTERACAO_SERVICO_ERRO, 'Fechar', { duration: 4000 })
		})
	}

	ngAfterViewInit(): void {
	}

}
