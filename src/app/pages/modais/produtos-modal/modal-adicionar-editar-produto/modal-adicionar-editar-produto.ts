import { Component, OnInit, AfterViewInit, Optional, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger60ms } from "src/@vex/animations/stagger.animation";
import { EventEmitterService } from "src/app/services/event.service";
import { ProdutoService } from "src/app/services/produtos.service";
import { MessagesSnackBar } from "src/app/_constants/messagesSnackBar";
import { Categoria } from "src/app/_models/categoria";
import { Produto } from "src/app/_models/produto";

@Component({
    selector: 'modal-adicionar-editar-produto',
    templateUrl: 'modal-adicionar-editar-produto.html',
    animations: [
        stagger60ms,
        fadeInUp400ms
    ]
})

export class ModalAdicionarProduto implements OnInit, AfterViewInit {

    form: FormGroup;
    legendaBotao = 'Cadastrar';
    estabelecimentoID = localStorage.getItem('estabelecimento_ID');
    produto = new Produto();
    constructor(
        private fb: FormBuilder,
        private snackbar: MatSnackBar,
        @Optional() @Inject(MAT_DIALOG_DATA) public alterarProduto: any,
        private produtoService: ProdutoService) {
        this.legendaBotao = alterarProduto ? 'Alterar' : 'Cadastrar';
    }

    selecaoCategoria: Categoria[] = [
        { value: 'CABELOF', viewValue: 'Cabelo Feminino' },
        { value: 'CABELOM', viewValue: 'Cabelo Masculino' },
        { value: 'UNHA', viewValue: 'Unha' },
        { value: 'PELE', viewValue: 'Pele' },
    ];

    ngOnInit(): void {

        if (this.alterarProduto) {
            this.produto = new Produto(this.alterarProduto)
        }

        this.form = this.fb.group({
            nomeProduto: ['', Validators.required],
            qtdEstoque: ['', Validators.required],
            categoria: ['', Validators.required],
            dsProduto: ['', Validators.required],
            promocional: [''],
            valor: ['', Validators.required],
            valorPromocional: ['', Validators.required],
        });
    }


    enviarProduto(produto: Produto) {
        produto.estabelecimentoID = +this.estabelecimentoID;

        produto.id ? this.alterar(produto) : this.cadastrar(produto);
    }

    cadastrar(produto: Produto) {
        produto.ativo = true;
        this.produtoService.cadastrar(produto).subscribe(response => {
            EventEmitterService.get('buscarProduto').emit();
            this.snackbar.open(MessagesSnackBar.CADASTRO_PRODUTO_SUCESSO, 'Fechar', { duration: 4000 })
        }, (error) => {
            console.log(error);
            this.snackbar.open(MessagesSnackBar.CADASTRO_PRODUTO_ERRO, 'Fechar', { duration: 4000 })
        })
    }

    alterar(produto: Produto) {
        this.produtoService.alterarProduto(produto).subscribe(response => {
            EventEmitterService.get('buscarProduto').emit();
            this.snackbar.open(MessagesSnackBar.ALTERACAO_PRODUTO_SUCESSO, 'Fechar', { duration: 4000 })
        }, (error) => {
            console.log(error);
            this.snackbar.open(MessagesSnackBar.ALTERACAO_PRODUTO_ERRO, 'Fechar', { duration: 4000 })
        })
    }

    ngAfterViewInit(): void {
    }

}
