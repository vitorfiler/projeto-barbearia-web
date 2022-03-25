import { Component, Optional, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EventEmitterService } from "src/app/services/event.service";
import { MessagesSnackBar } from "src/app/_constants/messagesSnackBar";
import { ProdutoService } from "src/app/services/produtos.service";

@Component({
    selector: 'modal-deletar-produto',
    templateUrl: 'modal-deletar-produto.html',
})
export class ModalDeletarProduto {

    constructor(
        private produtoService: ProdutoService,
        private snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<ModalDeletarProduto>,
        @Optional() @Inject(MAT_DIALOG_DATA) public produto: any) { }

    deletar() {
        this.produtoService.deletarProduto(this.produto.id).subscribe(response => {
            EventEmitterService.get('buscarProduto').emit();
            this.snackbar.open(MessagesSnackBar.DELETAR_PRODUTO_SUCESSO, 'Fechar', { duration: 4000 })
        }, (error) => {
            console.log(error);
            this.snackbar.open(MessagesSnackBar.DELETAR_PRODUTO_ERRO, 'Fechar', { duration: 4000 })
        })
    }
}
