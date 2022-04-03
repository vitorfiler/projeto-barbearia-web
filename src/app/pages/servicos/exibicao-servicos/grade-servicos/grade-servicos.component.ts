import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms, stagger40ms } from 'src/@vex/animations/stagger.animation';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitterService } from 'src/app/services/event.service';
import ModalServicoPromocional from '../../../modais/servico-modais/modal-servico-promocional/modal-servico-promocional';
import { ModalDeletarServico } from '../../../modais/servico-modais/modal-deletar-servico/modal-deletar-servico';
import ModalOcultarServico from '../../../modais/servico-modais/modal-ocultar-servicos/modal-ocultar-servico';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from 'src/app/_models/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicoService } from 'src/app/services/servico.service';
import { Servico } from 'src/app/_models/servico';
import { ModalCadastrarEditarServico } from '../../../modais/servico-modais/modal-cadastrar-editar-servico/modal-cadastrar-editar-servico';
import { Card } from './../../../../_models/card';
import { ConstrucaoModal } from 'src/app/pages/modais/construcao-modal/modal-adicionar-servicos';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleFadeIn400ms } from 'src/@vex/animations/scale-fade-in.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';


@Component({
	selector: 'vex-grade-servicos',
	templateUrl: './grade-servicos.component.html',
	styleUrls: ['./grade-servicos.component.scss'],
	animations: [
		fadeInUp400ms,
		stagger20ms,
		scaleIn400ms,
		fadeInRight400ms,
		stagger40ms,
		scaleFadeIn400ms
	]
})
export class GradeServicosComponent implements OnInit {
	form: FormGroup;
	filtroCategoria: string;
	lista: boolean = true;
	visible = false;
	categoria: string;
	servico: Servico;
	@Input() servicos: Servico[] = []
	larguraTela: any;
	mostraBotaoListaGradeNaTabela = false;
	mostraBotaoListaGradeNoFiltro = false;
	estabelecimentoID = localStorage.getItem('estabelecimento_ID')
	public carregando = false;

	// filteredCard = dadosServicos;

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
		private servicoService: ServicoService,
		private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.inicializarFiltro();
		console.log(this.servicos);		
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
		dialogRef.afterClosed().subscribe(result => { });
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

			})
	}

	botaoVisualizacao() {
		this.visible = this.visible ? false : true

	}

	openContact(id?: Card['id']) {
		this.dialog.open(ConstrucaoModal, {
			data: id || null,
			width: '600px'
		});
	}

	ngAfterViewInit() {
	
	}

}


