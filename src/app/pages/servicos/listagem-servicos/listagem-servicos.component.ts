import { ServicoService } from './../../../services/servico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Servico } from 'src/app/_models/servico';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from 'src/app/_models/categoria';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalAdicionarServico } from '../../modais/servicoes-modais/modal-adicionar-servicos';


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
	servicos: Servico[] = []
	dataSource = new MatTableDataSource<Servico>()
	displayedColumns: string[] = ['categoria', 'descricao', 'tempoEstimado', 'valor', 'acoes'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) matSort: MatSort;

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

	}

	ngOnInit(): void {
		this.inicializarFiltro();
		this.listarServicos();
	}

	inicializarFiltro() { //inicializar filtros de pesquisa
		this.form = this.fb.group({
			filtro: [''],
			categoria: [this.selecaoCategoria[0].value]
		});
	}

	// modal criado para adição de formulario inclusão de servicos
	abrirModalAdicionarServico(isAdicionar: boolean) {
		let dialogRef;
		if (isAdicionar) {
			dialogRef = this.dialog.open(ModalAdicionarServico)
		}
	}

	listarServicos() {
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


