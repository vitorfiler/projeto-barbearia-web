import { ServicoService } from './../../../../services/servico.service';
import { Component, Optional, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EventEmitterService } from "src/app/services/event.service";
import { AgendamentoService } from "src/app/services/agendamento.service";
import { MessagesSnackBar } from "src/app/_constants/messagesSnackBar";

@Component({
	selector: 'modal-ocultar-servico',
	templateUrl: 'modal-ocultar-servico.html',
})
export default class ModalOcultarServico implements OnInit{

	textoModal: String;

	constructor(
		private servicoService: ServicoService,
		private snackbar: MatSnackBar,
		@Optional() @Inject(MAT_DIALOG_DATA) public servico: any) { }

	ngOnInit(): void {
		if(this.servico.ativo){
			this.servico.ativo = false;
			this.textoModal = 'Tem certeza que deseja ocultar esse serviço!'
		}else{
			this.servico.ativo = true;
			this.textoModal = 'Tem certeza que deseja exibir esse serviço!'
		}
	}

	trocarStatusServico() {
		
		// Subscribe
		this.servicoService.trocarStatusServico(this.servico).subscribe(response => {
			// EventEmitterService.get('buscar').emit();
			this.snackbar.open(MessagesSnackBar.DELETAR_AGENDAMENTO_SUCESSO, 'Fechar', { duration: 4000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.DELETAR_AGENDAMENTO_ERRO, 'Fechar', { duration: 4000 })
		})
	}
}
