import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from 'src/app/services/produtos.service';
import { Categoria } from 'src/app/_models/categoria';
import { Produto } from 'src/app/_models/produto';
import { ProdutosConstrucaoModal } from '../../modais/produtos-modal/modal-produtos';

@Component({
	selector: 'vex-caixa',
	templateUrl: './caixa.component.html',
	styleUrls: ['./caixa.component.scss']
})
export class CaixaComponent implements OnInit {
	form: FormGroup;
	filtroCategoria: string;
	lista: boolean = true;
	visible = false;
	categoria: string;
	alturaTela: any;
	larguraTela: any;
	produto: Produto;
	mostraBotaoListaGradeNaTabela = false;
	mostraBotaoListaGradeNoFiltro = false;
	estabelecimentoID = localStorage.getItem('estabelecimento_ID')


	selecaoCategoria: Categoria[] = [
		{ value: 'TODOS', viewValue: 'Todos' },
		{ value: 'CONFIRMADOS', viewValue: 'Confirmados' },
		{ value: 'RESERVADOS', viewValue: 'Reservados' },
		{ value: 'RECUSADOS', viewValue: 'Recusados' },
	];
	constructor(
		private fb: FormBuilder,
		public dialog: MatDialog,
		private produtoService: ProdutoService
	) {
		this.botaoGradeListaPorPixel();
	}

	ngOnInit(): void {
		this.inicializarFiltro();
	}

	inicializarFiltro() { //inicializar filtros de pesquisa
		this.form = this.fb.group({
			filtro: [''],
			categoria: ['']
		});
		this.categoria = this.selecaoCategoria[0].value;
	}

	// modal criado para adição de formulario inclusão de servicos
	abrirModalAdicionarServico(isAdicionar: boolean) {
		let dialogRef;
		if (isAdicionar) {
			dialogRef = this.dialog.open(ProdutosConstrucaoModal)
		}
	}

	filtrar() {
		this.produtoService.filtrar(this.estabelecimentoID, this.filtroCategoria, this.categoria)
			.subscribe(resposta => {
				this.produto = resposta.body

			})
	}

	@HostListener('window:resize', ['$event'])
	botaoGradeListaPorPixel(event?) {

		this.alturaTela = window.innerHeight;
		this.larguraTela = window.innerWidth;
		if (this.larguraTela >= 407 && this.larguraTela <= 767) {
			this.mostraBotaoListaGradeNaTabela = true
			this.mostraBotaoListaGradeNoFiltro = false
		} else if (this.larguraTela > 767) {
			this.mostraBotaoListaGradeNaTabela = false
			this.mostraBotaoListaGradeNoFiltro = true;
		} else {
			this.mostraBotaoListaGradeNaTabela = false
			this.mostraBotaoListaGradeNoFiltro = false;
		}
	}


	botaoVisualizacao() {
		this.visible = this.visible ? false : true

	}
}
