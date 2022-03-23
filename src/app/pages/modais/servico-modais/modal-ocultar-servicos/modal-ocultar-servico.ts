import { ServicoService } from '../../../../services/servico.service';
import { Component, Optional, Inject, OnInit, HostListener } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EventEmitterService } from "src/app/services/event.service";
import { AgendamentoService } from "src/app/services/agendamento.service";
import { MessagesSnackBar } from "src/app/_constants/messagesSnackBar";

@Component({
	selector: 'modal-ocultar-servico',
	templateUrl: 'modal-ocultar-servico.html',
})
export default class ModalOcultarServico implements OnInit {

	textoModal: String;
	botaoModal: String;

	constructor(
		private servicoService: ServicoService,
		private snackbar: MatSnackBar,
		private dialogRef: MatDialogRef<ModalOcultarServico>,
		@Optional() @Inject(MAT_DIALOG_DATA) public servico: any) { }

	ngOnInit(): void {
		this.textoModal = this.servico.ativo ? 'Tem certeza que deseja ocultar este serviço para seus clientes?'
			: 'Tem certeza que deseja exibir este serviço para seus clientes?'
		this.botaoModal = this.servico.ativo ? 'Ocultar' : 'Exibir'
	}

	trocarStatusServico() {
		this.servico.ativo = this.servico.ativo ? false : true;

		this.servicoService.alterarAgendamento(this.servico).subscribe(response => {
			EventEmitterService.get('buscar').emit();
			this.dialogRef.close(this.servico);
			this.snackbar.open(MessagesSnackBar.VISUALIZACAO_SERVICO_ALTERADA_SUCESSO, 'Fechar', { duration: 4000 })
		}, (error) => {
			console.log(error);
			this.dialogRef.close(this.servico);
			this.snackbar.open(MessagesSnackBar.VISUALIZACAO_SERVICO_ALTERADA_ERRO, 'Fechar', { duration: 4000 })
		})
	}


}
