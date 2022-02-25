import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ReservasService } from 'src/app/services/reservas.service';
import { Reserva } from 'src/app/_models/reserva';
import { Status } from 'src/app/_models/status';

@Component({
	selector: 'vex-reservas',
	templateUrl: './reservas.component.html',
	styleUrls: ['./reservas.component.scss'],
	providers: [{ provide: LOCALE_ID, useValue: 'pt' }],

})
export class ReservasComponent implements OnInit {
	filtroReserva: string;
	selecaoStatus: string;
	formReserva: FormGroup;
	public carregando = false;
	estabelecimentoID = localStorage.getItem('estabelecimento_ID');
	reservas: Reserva[] = [];
	dataSource = new MatTableDataSource<Reserva>()

	statusReserva: any[] = [
		{ value: 'TODOS', viewValue: 'Todos' },
		{ value: 'AGUARDANDORETIRADA', viewValue: 'Aguardando Retirada' },
		{ value: 'CANCELADO', viewValue: 'Cancelado' },
		{ value: 'ENTREGUE', viewValue: 'Entregue' },
	];
	constructor(private fb: FormBuilder,
		private reservasService: ReservasService,
		/* correção de data para Português, importanções feitas no app.module.ts*/
		private snackbar: MatSnackBar, private dateAdapter: DateAdapter<any>,
	) {
		this.dateAdapter.setLocale('pt-BR');
	}

	ngOnInit(): void {
		this.inicializarFiltro();
	}

	inicializarFiltro() {
		this.formReserva = this.fb.group({
			filtro: [''],
			statusReserva: [this.statusReserva[0].value],
			dataReserva: ['']
		});
	}
	clearForm() {
		this.formReserva.reset();
	}

	validarFiltro() {
		let filtroData = this.formReserva.get('dataReserva').value
		if (filtroData) {
			filtroData = (filtroData.getFullYear() + "-" + ((filtroData.getMonth() + 1)) + "-" + (filtroData.getDate()));
			this.filtrar(this.filtroReserva, filtroData, this.selecaoStatus);
		}
	}

	filtrar(filtroReserva, filtroData, selecaoStatus) {
		this.carregando = true;
		this.reservasService.filtrar(this.estabelecimentoID, filtroReserva, filtroData, selecaoStatus).subscribe(resposta => {
			this.reservas = resposta.body
			/*renderizando a tabela*/
			this.carregando = false;
			this.dataSource = new MatTableDataSource<Reserva>(this.reservas)

		})
	}
}
