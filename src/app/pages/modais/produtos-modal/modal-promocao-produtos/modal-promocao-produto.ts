import { Component, Optional, Inject, OnInit, HostListener } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProdutoService } from 'src/app/services/produtos.service';

@Component({
    selector: 'modal-promocao-produto',
    templateUrl: 'modal-promocao-produto.html',
})
export default class ModalPromocaoProdutos implements OnInit {

    textoModal: String;
    botaoModal: String;

    constructor(
        private produtoService: ProdutoService,
        private snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<ModalPromocaoProdutos>,
        @Optional() @Inject(MAT_DIALOG_DATA) public produto: any) { }

    ngOnInit(): void {

        this.textoModal = this.produto.promocional ? 'Tem certeza que deseja remover a promoção deste produto?'
            : 'Tem certeza que deseja tornar este produto como promocional?'

    }

    trocarPromocao() {
        this.produto.promocional = this.produto.promocional ? false : true;
    }


}
