import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
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

	//variaveis
	public carregando = false;
	estabelecimentoID = localStorage.getItem('estabelecimento_ID');
	statusPadrao: String;

	//Objeto
	formReserva: FormGroup;

	//Tabela
	displayedColumns: string[] = ['cliente', 'produto', 'quantidade', 'valor', 'dataRetirada', 'status', 'acoes'];
	dataSource = new MatTableDataSource<Reserva>()
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('select') matSelect: MatSelect;
	@ViewChild(MatSort) matSort: MatSort;

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
		this.inicializarFiltro();
	}

	inicializarFiltro() {
		this.formReserva = this.fb.group({
			filtro: [''],
			status: [''],
			dt_inicial: [''],
			dt_final: [''],
		});
		this.statusPadrao = this.statusReserva[0].value
	}

	clearForm() {
		this.formReserva.reset();
	}

	abrirModalAdicionarServico(isAdicionar: boolean) {
		let dialogRef;
		if (isAdicionar) {
			dialogRef = this.dialog.open(ConstrucaoModal)
		}
	}

	validarFiltro() {
		let dt_inicial = this.formReserva.get('dt_inicial').value
		let dt_final = this.formReserva.get('dt_final').value
		let selecaoStatus = this.formReserva.get('status').value
		let filtroReserva = this.formReserva.get('filtro').value

		if (dt_inicial && dt_final) {

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

	filtrar(filtroReserva, selecaoStatus, dt_inicial, dt_final) {
		this.carregando = true;
		this.reservasService.filtrar(this.estabelecimentoID, filtroReserva, selecaoStatus, dt_inicial, dt_final).subscribe(resposta => {
			this.reservas = resposta.body
			/*renderizando a tabela*/
			// this.carregando = false;
			// this.dataSource = new MatTableDataSource<Reserva>(this.reservas)

		})
	}
}
