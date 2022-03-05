import { Component, Optional, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EventEmitterService } from "src/app/services/event.service";
import { AgendamentoService } from "src/app/services/agendamento.service";
import { MessagesSnackBar } from "src/app/_constants/messagesSnackBar";

@Component({
	selector: 'modal-deletar-agendamento',
	templateUrl: 'modal-deletar-agendamento.html',
})
export class ModalDeletarAgendamento {

	constructor(
		private agendamentoService: AgendamentoService,
		private snackbar: MatSnackBar,
		@Optional() @Inject(MAT_DIALOG_DATA) public agendamentoID: any) { }

	deletar() {
		// Subscribe

		this.agendamentoService.deleteAgendamento(this.agendamentoID).subscribe(response => {
			EventEmitterService.get('buscar').emit();
			this.snackbar.open(MessagesSnackBar.DELETAR_AGENDAMENTO_SUCESSO, 'Fechar', { duration: 4000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.DELETAR_AGENDAMENTO_ERRO, 'Fechar', { duration: 4000 })
		})
	}
}
