
import { Component, Optional, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessagesSnackBar } from "src/app/_constants/messagesSnackBar";
import { ProdutoService } from "src/app/services/produtos.service";

@Component({
    selector: 'modal-ocultar-produtos',
    templateUrl: 'modal-ocultar-produtos.html',
})
export default class ModalOcultarProduto implements OnInit {

    textoModal: String;
    botaoModal: String;

    constructor(
        private produtoService: ProdutoService,
        private snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<ModalOcultarProduto>,
        @Optional() @Inject(MAT_DIALOG_DATA) public produto: any) { }

    ngOnInit(): void {
        this.textoModal = this.produto.ativo ? 'Tem certeza que deseja ocultar este produto para seus clientes?'
            : 'Tem certeza que deseja exibir este produto para seus clientes?'
        this.botaoModal = this.produto.ativo ? 'Ocultar' : 'Exibir'
    }

    trocarStatusProduto() {
        this.produto.ativo = this.produto.ativo ? false : true;
    }
}
