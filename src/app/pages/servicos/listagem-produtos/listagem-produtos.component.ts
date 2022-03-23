import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from 'src/app/services/produtos.service';
import { Categoria } from 'src/app/_models/categoria';
import { Produto } from 'src/app/_models/produto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { EventEmitterService } from 'src/app/services/event.service';
import { ProdutosConstrucaoModal } from '../../modais/produtos-modal/modal-produtos';
import ModalOcultarProduto from '../../modais/produtos-modal/modal-ocultar-produtos/modal-ocultar-produtos';
import ModalPromocaoProdutos from '../../modais/produtos-modal/modal-promocao-produtos/modal-promocao-produto';
import { ModalDeletarProduto } from '../../modais/produtos-modal/modal-deletar-produtos/modal-deletar-produto';
import { ModalAdicionarProduto } from '../../modais/produtos-modal/modal-adicionar-editar-produto/modal-adicionar-editar-produto';


@Component({
	selector: 'vex-listagem-produtos',
	templateUrl: './listagem-produtos.component.html',
	styleUrls: ['./listagem-produtos.component.scss'],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]
})

export class ListagemProdutosComponent implements OnInit {
	//objeto
	form: FormGroup;

	//variaveis
	filtroCategoria: string;
	categoria: string;
	estabelecimentoID = localStorage.getItem('estabelecimento_ID')
	public carregando = false;

	//visualização em grade e lista
	visible = false;
	alturaTela: any;
	larguraTela: any;
	mostraBotaoListaGradeNaTabela = false;
	mostraBotaoListaGradeNoFiltro = false;

	//tabela	
	dataSource = new MatTableDataSource<Produto>()
	displayedColumns: string[] = ['nomeProduto', 'dsProduto', 'qtdEstoque', 'valor', 'valorPromocional', 'acoes'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) matSort: MatSort;

	//Listas
	produto: Produto[] = [];
	selecaoCategoria: Categoria[] = [
		{ value: 'TODOS', viewValue: 'Todos' },
		{ value: 'CABELOF', viewValue: 'Cabelo Feminino' },
		{ value: 'CABELOM', viewValue: 'Cabelo Masculino' },
		{ value: 'UNHA', viewValue: 'Unha' },
		{ value: 'PELE', viewValue: 'Pele' },
	];

	constructor(
		private fb: FormBuilder,
		public dialog: MatDialog,
		private produtoService: ProdutoService) {
		this.botaoGradeListaPorPixel();
	}


	ngOnInit(): void {
		this.inicializarFiltro();
		EventEmitterService.get('buscarProdutos').subscribe(() => this.listarProdutos())
	}


	inicializarFiltro() { //inicializar filtros de pesquisa
		this.form = this.fb.group({
			filtro: [''],
			categoria: ['']
		});
		this.categoria = this.selecaoCategoria[0].value;
		this.listarProdutos();
	}

	listarProdutos() {
		this.carregando = true;
		this.produtoService.listarProdutos(this.estabelecimentoID).subscribe(response => {
			this.produto = response.body
			this.carregando = false;
			this.dataSource = new MatTableDataSource<Produto>(this.produto)
			this.dataSource.paginator = this.paginator
		}, (error) => {
			console.log(error);
			this.carregando = false;
		})
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


	/**MODAIS**/

	// modal criado para adição de formulario inclusão de produtos
	abrirModalAdicionarProduto(produto?: Produto) {
		const dialogRef = this.dialog.open(ModalAdicionarProduto, {
			data: produto
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

	trocarPromocionalProduto(produto: Produto) {
		const dialogRef = this.dialog.open(ModalPromocaoProdutos, {
			data: produto
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

	ocultarProduto(produto: Produto) {
		const dialogRef = this.dialog.open(ModalOcultarProduto, {
			data: produto
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

	deletarProduto(produto: Produto) {
		const dialogRef = this.dialog.open(ModalDeletarProduto, {
			data: produto
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.matSort;
	}
}
