import { AfterViewInit, Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ReservasService } from 'src/app/services/reservas.service';
import { Reserva } from 'src/app/_models/reserva';
import { Status } from 'src/app/_models/status';
import { ConstrucaoModal } from '../../modais/construcao-modal/modal-adicionar-servicos';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { EventEmitterService } from 'src/app/services/event.service';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
	selector: 'vex-listagem-reservas',
	templateUrl: './listagem-reservas.component.html',
	styleUrls: ['./listagem-reservas.component.scss'],
	providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]
})

export class ListagemReservasComponent implements OnInit {
	//Tabela
	dataSource = new MatTableDataSource<Reserva>()
	displayedColumns: string[] = ['cliente', 'produto', 'quantidade', 'valor', 'dataRetirada', 'status', 'acoes'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('select') matSelect: MatSelect;
	@ViewChild(MatSort, { static: false }) matSort: MatSort;


	//variaveis
	estabelecimentoID = localStorage.getItem('estabelecimento_ID');
	public carregando = false;
	statusPadrao: String;

	//Objeto
	form: FormGroup;

	//Listas
	reservas: Reserva[] = [];
	status: Status[] = [
		{ value: 'AGUARDANDORETIRADA', viewValue: 'Aguardando Retirada' },
		{ value: 'CANCELADO', viewValue: 'Cancelado' },
		{ value: 'ENTREGUE', viewValue: 'Entregue' },
	];

	statusReserva: Status[] = [
		{ value: 'TODOS', viewValue: 'Todos' },
		{ value: 'AGUARDANDORETIRADA', viewValue: 'Aguardando Retirada' },
		{ value: 'CANCELADO', viewValue: 'Cancelado' },
		{ value: 'ENTREGUE', viewValue: 'Entregue' },
	];

	constructor(private fb: FormBuilder,
		private reservasService: ReservasService,
		/* correção de data para Português, importanções feitas no app.module.ts*/
		private snackbar: MatSnackBar, private dateAdapter: DateAdapter<any>,
		public dialog: MatDialog
	) {
		this.dateAdapter.setLocale('pt-BR');
	}

	ngOnInit(): void {
		EventEmitterService.get('buscar').subscribe(() => this.listar())
		this.inicializarFiltro();
	}

	listar() {
		this.carregando = true;
		this.reservasService.listarReservas(this.estabelecimentoID).subscribe(response => {
			this.reservas = response.body
			this.carregando = false;
			this.dataSource = new MatTableDataSource<Reserva>(this.reservas)
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.matSort

		}, (error) => {
			console.log(error);
			this.carregando = false;
		})
	}

	inicializarFiltro() {
		this.form = this.fb.group({
			filtro: [''],
			status: [''],
			dt_inicial: [''],
			dt_final: [''],
		});
		this.statusPadrao = this.statusReserva[0].value;
		this.listar();
	}

	clearForm() {
		this.form.reset();
		setTimeout(() => {
			this.inicializarFiltro();
		});
	}

	abrirModalAdicionarServico(isAdicionar: boolean) {
		let dialogRef;
		if (isAdicionar) {
			dialogRef = this.dialog.open(ConstrucaoModal)
		}
	}

	validarFiltro() {
		let dt_inicial = this.form.get('dt_inicial').value
		let dt_final = this.form.get('dt_final').value
		let selecaoStatus = this.form.get('status').value
		let filtroReserva = this.form.get('filtro').value

		// condicional para que seja possivel fazer filtragem com apenas um valor de entrada
		if (dt_inicial != "" && dt_final == "") {
			dt_inicial = (dt_inicial.getFullYear() + "-" + ((dt_inicial.getMonth() + 1)) + "-" + (dt_inicial.getDate()));
			this.filtrar(filtroReserva, selecaoStatus, dt_inicial);
		}
		//condicional para conversão de data com 2 variaveis com valor atribuido 
		else if (dt_inicial && dt_final) {
			if (dt_inicial > dt_final) {
				this.snackbar.open("Insira uma data final maior que inicial", 'Ok', { duration: 4000 });
				return;
			}
			dt_inicial = (dt_inicial.getFullYear() + "-" + ((dt_inicial.getMonth() + 1)) + "-" + (dt_inicial.getDate()));
			dt_final = (dt_final.getFullYear() + "-" + ((dt_final.getMonth() + 1)) + "-" + (dt_final.getDate()));
			this.filtrar(filtroReserva, selecaoStatus, dt_inicial, dt_final);
		}
		else {
			this.filtrar(filtroReserva, selecaoStatus, dt_inicial, dt_final);
		}
	}

	filtrar(filtroReserva, selecaoStatus, dt_inicial, dt_final?) {
		this.carregando = true;
		this.reservasService.filtrar(this.estabelecimentoID, filtroReserva, selecaoStatus, dt_inicial, dt_final).subscribe(resposta => {
			this.reservas = resposta.body
			/*renderizando a tabela*/
			this.carregando = false;
			this.dataSource = new MatTableDataSource<Reserva>(this.reservas)
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.matSort;

		})
	}

	ngAfterViewInit() {

	}

}
