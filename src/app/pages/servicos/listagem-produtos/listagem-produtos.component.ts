import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from 'src/app/services/produtos.service';
import { Categoria } from 'src/app/_models/categoria';
import { Produto } from 'src/app/_models/produto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { EventEmitterService } from 'src/app/services/event.service';
import ModalServicoPromocional from '../../modais/servico-modais/modal-servico-promocional/modal-servico-promocional';
import { ModalDeletarServico } from '../../modais/servico-modais/modal-deletar-servico/modal-deletar-servico';
import ModalOcultarServico from '../../modais/servico-modais/modal-ocultar-servicos/modal-ocultar-servico';
import { ServicoService } from 'src/app/services/servico.service';
import { Servico } from 'src/app/_models/servico';
import { ModalCadastrarEditarServico } from '../../modais/servico-modais/modal-cadastrar-editar-servico/modal-cadastrar-editar-servico';

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
	public carregando = false;
	servico: Servico;
	servicos: Servico[] = []
	dataSource = new MatTableDataSource<Servico>()
	displayedColumns: string[] = ['nomeServico', 'categoria', 'descricao', 'tempoEstimado', 'valor', 'acoes'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) matSort: MatSort;
	

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
		private produtoService: ProdutoService,
		private servicoService: ServicoService) {

			this.botaoGradeListaPorPixel();		}
	 
	
	ngOnInit(): void {
		this.inicializarFiltro();
		EventEmitterService.get('buscarServicos').subscribe(() => this.listarProdutos())
			this.inicializarFiltro();
			this.listarProdutos();
	}
	

	inicializarFiltro() { //inicializar filtros de pesquisa
		this.form = this.fb.group({
			filtro: [''],
			categoria: ['']
		});
		this.categoria = this.selecaoCategoria[0].value;
	}


	listarProdutos() {
		this.carregando = true;
		this.servicoService.listarServicos(this.estabelecimentoID).subscribe(response => {
			this.carregando = false
			this.servicos = response.body

			this.dataSource = new MatTableDataSource<Servico>(this.servicos)
			setTimeout(() => {
				this.dataSource.paginator = this.paginator
				this.dataSource.sort = this.matSort
			})
		}, (error) => {
			console.log(error);
			this.carregando = false;
		})
	}


	trocarPromocionalProduto(servico: Servico) {
		const dialogRef = this.dialog.open(ModalServicoPromocional, {
			data: servico
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}


	trocarStatusProduto(servico: Servico) {
		const dialogRef = this.dialog.open(ModalOcultarServico, {
			data: servico
		});
		dialogRef.afterClosed().subscribe(result => { 
		});
	}


	deletarProduto(servico: Servico) {
		const dialogRef = this.dialog.open(ModalDeletarServico, {
			data: servico
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}


	// modal criado para adição de formulario inclusão de servicos
	abrirModalAdicionarProduto(servico?: Servico) {
		const dialogRef = this.dialog.open(ModalCadastrarEditarServico, {
			data: servico
		});
		dialogRef.afterClosed().subscribe(result => {});
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

	
	ngAfterViewInit() {
		this.dataSource.sort = this.matSort;
	}
}
