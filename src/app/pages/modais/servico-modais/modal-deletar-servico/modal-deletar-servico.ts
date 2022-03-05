import { Component, Optional, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EventEmitterService } from "src/app/services/event.service";
import { MessagesSnackBar } from "src/app/_constants/messagesSnackBar";
import { ServicoService } from "src/app/services/servico.service";

@Component({
	selector: 'modal-deletar-servico',
	templateUrl: 'modal-deletar-servico.html',
})
export class ModalDeletarServico {

	constructor(
		private servicoService: ServicoService,
		private snackbar: MatSnackBar,
		private dialogRef: MatDialogRef<ModalDeletarServico>,
		@Optional() @Inject(MAT_DIALOG_DATA) public servico: any) { }

	deletar() {
		this.servicoService.deletarServico(this.servico.id).subscribe(response => {
			EventEmitterService.get('buscarServicos').emit();
			this.snackbar.open(MessagesSnackBar.DELETAR_SERVICO_SUCESSO, 'Fechar', { duration: 4000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.DELETAR_SERVICO_ERRO, 'Fechar', { duration: 4000 })
		})
	}
}
