import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitterService } from 'src/app/services/event.service';
import ModalServicoPromocional from '../../../modais/servico-modais/modal-servico-promocional/modal-servico-promocional';
import { ModalDeletarServico } from '../../../modais/servico-modais/modal-deletar-servico/modal-deletar-servico';
import ModalOcultarServico from '../../../modais/servico-modais/modal-ocultar-servicos/modal-ocultar-servico';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from 'src/app/_models/categoria';
import { Router } from '@angular/router';
import { ServicoService } from 'src/app/services/servico.service';
import { Servico } from 'src/app/_models/servico';
import { ModalCadastrarEditarServico } from '../../../modais/servico-modais/modal-cadastrar-editar-servico/modal-cadastrar-editar-servico';

@Component({
	selector: 'vex-listagem-servicos',
	templateUrl: './listagem-servicos.component.html',
	styleUrls: ['./listagem-servicos.component.scss'],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]
})
export class ListagemServicosComponent implements OnInit {
	form: FormGroup;
	filtroCategoria: string;
	lista: boolean = true;
	visible = false;
	categoria: string;
	servico: Servico;
	@Input() servicos: Servico[] = []
	dataSource = new MatTableDataSource<Servico>()
	displayedColumns: string[] = ['nome', 'categoria', 'descricao', 'tempoEstimado', 'valor', 'acoes'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) matSort: MatSort;
	alturaTela: any;
	larguraTela: any;
	mostraBotaoListaGradeNaTabela = false;
	mostraBotaoListaGradeNoFiltro = false;

	estabelecimentoID = localStorage.getItem('estabelecimento_ID')
	public carregando = false;

	selecaoCategoria: Categoria[] = [
		{ value: 'TODOS', viewValue: 'Todos' },
		{ value: 'CABELOF', viewValue: 'Cabelo Feminino' },
		{ value: 'CABELOM', viewValue: 'Cabelo Masculino' },
		{ value: 'UNHA', viewValue: 'Unha' },
		{ value: 'PELE', viewValue: 'Pele' },

	];

	constructor(private router: Router,
		private fb: FormBuilder,
		public dialog: MatDialog,
		private servicoService: ServicoService) {

		this.botaoGradeListaPorPixel();
	}

	ngOnInit(): void {
    EventEmitterService.get('buscarServicos').subscribe(() => this.listarServicos())
		this.inicializarFiltro();
		this.listarServicos();
	}

	@HostListener('window:resize', ['$event'])
	botaoGradeListaPorPixel(event?) {

		this.alturaTela = window.innerHeight;
		this.larguraTela = window.innerWidth;
		if (this.larguraTela >= 407 && this.larguraTela <= 767) {
			this.mostraBotaoListaGradeNaTabela = true
			this.mostraBotaoListaGradeNoFiltro = false
		} else if(this.larguraTela > 767){
			this.mostraBotaoListaGradeNaTabela = false
			this.mostraBotaoListaGradeNoFiltro = true;
		} else {
			this.mostraBotaoListaGradeNaTabela = false
			this.mostraBotaoListaGradeNoFiltro = false;
		}
	}

	inicializarFiltro() { //inicializar filtros de pesquisa
		this.form = this.fb.group({
			filtro: [''],
			categoria: ['']
		});
		this.categoria = this.selecaoCategoria[0].value;
	}

	// modal criado para adição de formulario inclusão de servicos
	abrirModalAdicionarServico(servico?: Servico) {
		const dialogRef = this.dialog.open(ModalCadastrarEditarServico, {
			data: servico
		});
		dialogRef.afterClosed().subscribe(result => {});
	}

	listarServicos() {
		this.dataSource = new MatTableDataSource<Servico>(this.servicos)
			setTimeout(() => {
				this.dataSource.paginator = this.paginator
				this.dataSource.sort = this.matSort
			})
	}

  trocarStatusServico(servico: Servico) {
		const dialogRef = this.dialog.open(ModalOcultarServico, {
			data: servico
		});
		dialogRef.afterClosed().subscribe(result => { 
		});
	}

  trocarPromocionalServico(servico: Servico) {
		const dialogRef = this.dialog.open(ModalServicoPromocional, {
			data: servico
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

  deletarServico(servico: Servico) {
		const dialogRef = this.dialog.open(ModalDeletarServico, {
			data: servico
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

	filtrar() {
		this.servicoService.filtrar(this.estabelecimentoID, this.filtroCategoria, this.categoria)
			.subscribe(resposta => {
				this.servico = resposta.body
				/*renderizando a tabela*/
				this.carregando = false;
				this.dataSource = new MatTableDataSource<Servico>(this.servicos)
			})
	}

	botaoVisualizacao() {
		this.visible = this.visible ? false : true

	}

	ngAfterViewInit() {
		this.dataSource.sort = this.matSort;
	}

}


