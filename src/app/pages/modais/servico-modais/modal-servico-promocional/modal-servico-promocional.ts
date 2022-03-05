import { ServicoService } from '../../../../services/servico.service';
import { Component, Optional, Inject, OnInit, HostListener } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EventEmitterService } from "src/app/services/event.service";
import { AgendamentoService } from "src/app/services/agendamento.service";
import { MessagesSnackBar } from "src/app/_constants/messagesSnackBar";

@Component({
	selector: 'modal-servico-promocional',
	templateUrl: 'modal-servico-promocional.html',
})
export default class ModalServicoPromocional implements OnInit{

	textoModal: String;
	botaoModal: String;

	constructor(
		private servicoService: ServicoService,
		private snackbar: MatSnackBar,
		private dialogRef: MatDialogRef<ModalServicoPromocional>,
		@Optional() @Inject(MAT_DIALOG_DATA) public servico: any) { }

	ngOnInit(): void {
		// this.dialogRef.disableClose = true;
		// this.dialogRef. backdropClick().subscribe(_ => {
		//   this.dialogRef.close(this.servico);
		// })

		this.textoModal = this.servico.promocional? 'Tem certeza que deseja remover a promoção deste serviço?'
			: 'Tem certeza que deseja tornar este serviço como promocional?' 
		
	}
	// @HostListener('window:keyup.esc') onKeyUp() {
	// 	this.dialogRef.close(this.servico);
	// }

	trocarStatusServico() {
		this.servico.promocional = this.servico.promocional? false : true;

		this.servicoService.trocarStatusServico(this.servico).subscribe(response => {
			// EventEmitterService.get('buscar').emit();
			this.dialogRef.close(this.servico);
			this.snackbar.open(MessagesSnackBar.STATUS_PROMOCIONAL_SERVICO_ALTERADO_SUCESSO, 'Fechar', { duration: 4000 })
		}, (error) => {
			console.log(error);
			this.dialogRef.close(this.servico);
			this.snackbar.open(MessagesSnackBar.STATUS_PROMOCIONAL_SERVICO_ALTERADO_ERRO, 'Fechar', { duration: 4000 })
		})
	}

	
}
