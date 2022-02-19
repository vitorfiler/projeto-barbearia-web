import { Endereco } from './../../../_models/endereco';
import { CommomService } from 'src/app/services/commom.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Optional, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger60ms } from "src/@vex/animations/stagger.animation";
import { EventEmitterService } from "src/app/services/event.service";
import { MessagesSnackBar } from "src/app/_constants/messagesSnackBar";



@Component({
	selector: 'cadastro-estabelecimento-modal',
	templateUrl: 'cadastro-estabelecimento-modal.html',
	animations: [
		stagger60ms,
		fadeInUp400ms
	]
})

export class CadastroEstabelecimentoModal implements OnInit {

	estabelecimentoID: string = localStorage.getItem('estabelecimento_ID')
	endereco: Endereco = new Endereco()

	//   Campo tempo de Serviço
	form: FormGroup;
	legendaBotao = 'Cadastrar';

	constructor(
		private fb: FormBuilder,
		private commomService: CommomService,
		private snackbar: MatSnackBar,
		private http: HttpClient,
		@Optional() @Inject(MAT_DIALOG_DATA) public solicitacaoToEdit: any) {
		this.legendaBotao = solicitacaoToEdit ? 'Alterar' : 'Cadastrar';
	}
	ngOnInit() {

		this.form = this.fb.group({
			cep: ['', Validators.required],
			rua: ['', Validators.required],
			numero: ['', Validators.required],
			complemento: ['', Validators.required],
			bairro: ['', Validators.required],
			estado: ['', Validators.required],
			cidade: ['', Validators.required],
		});
	}

	//metodo para envio de confirmação de cadastro(formulario aberto no modal da tela de solicitações)
	confirmarcadastro(endereco: Endereco) {
		// Subscribe
		this.commomService.cadastrarEndereco(endereco).subscribe(response => {
			console.log(response);
			endereco = response.body;
			const body: any = {
				enderecoID: endereco.id,
				cadastroCompleto: true
			}
			this.commomService.finalizaCadastroEstabelecimento(body, this.estabelecimentoID).subscribe(data => {
				console.log(data);
			})
		}, (error) => {
			console.log(error)
		})
	}

	//metodo que sera utilizado para fazer busca de endereço por CEP
	consultarCEP(cep: string) {
		// this.CommomService.consultaCep(cep).subscribe(response =>{
		// 	console.log(response)

		// })
	}
}