import { Solicitacao } from './../../_models/solicitacao';
import { MatTableDataSource } from '@angular/material/table';
import { Estabelecimento } from 'src/app/_models/estabelecimento';
import { SolicitacaoService } from './../../services/solicitacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CadSolicitacao } from 'src/app/_models/cad-solicitacao';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';

@Component({
	selector: 'vex-solicitacoes',
	templateUrl: './solicitacoes.component.html',
	styleUrls: ['./solicitacoes.component.scss']
})

export class SolicitacoesComponent implements OnInit {

	estabelecimentoID = '1'
	displayedColumns: string[] = ['cliente', 'nomeServico', 'tempoEstimado', 'valor', 'dtAtendimento', 'responsavel', 'status'];

	dataSource = new MatTableDataSource<Solicitacao>()
	@ViewChild(MatPaginator) paginator: MatPaginator;

	solicitacoes: Solicitacao[] = []
	solicitacao: Solicitacao = new Solicitacao();
	color = "red"
	status: any[] = [
		{ value: 'ACEITO', viewValue: 'Aceito' },
		{ value: 'PENDENTE', viewValue: 'Pendente' },
		{ value: 'RECUSADO', viewValue: 'Recusado' },
	];

	form: FormGroup;
	constructor(private router: Router,
		private fb: FormBuilder,
		private solicitacaoService: SolicitacaoService,
		private snackbar: MatSnackBar,
    public dialog: MatDialog) { }

	ngOnInit(): void {
		window.localStorage.setItem('isSolicitacoes', 'true');
		this.form = this.fb.group({
			filtro: [''],
		});

		this.listar()
	}

	filtrar() {
		let filtro = this.form.get('filtro').value

		this.solicitacaoService.filtrar(this.estabelecimentoID, filtro).subscribe(resposta => {
			this.solicitacoes = resposta.body
			/*renderizando a tabela*/

			this.dataSource = new MatTableDataSource<Solicitacao>(this.solicitacoes)
			this.dataSource.paginator = this.paginator;
		})
	}

	alterarStatus(solicitacaoId) {
		let solicitacao = new CadSolicitacao();
		this.solicitacao = this.solicitacoes.find(s => s.id == solicitacaoId);

		delete this.solicitacao.cliente
		solicitacao = this.solicitacao;

		this.solicitacaoService.alterarSolicitacao(solicitacao).subscribe(() => {
			this.snackbar.open(MessagesSnackBar.SOLICITACAO_STATUS_SUCESSO, 'Close', { duration: 4000 });
			this.filtrar();
		}, (error)=>{
			this.snackbar.open(MessagesSnackBar.SOLICITACAO_STATUS_ERRO, 'Close', { duration: 4000 });
			console.log(error);
		})
	}

	listar() {
		this.solicitacaoService.getSolicitacoes(this.estabelecimentoID).subscribe(resposta => {
			this.solicitacoes = resposta.body

			this.dataSource = new MatTableDataSource<Solicitacao>(this.solicitacoes)
			this.dataSource.paginator = this.paginator;

		})
	}

  openDialog() {
    const dialogRef = this.dialog.open(SolicitacoesModal);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 
}

export interface CountryState {
	name: string;
	population: string;
	flag: string;
  }
@Component({
	selector: 'dialog-content-example-dialog',
	templateUrl: 'solicitacoes-modal.html',
	animations: [
		stagger60ms,
		fadeInUp400ms
	  ]
  })
  
export class SolicitacoesModal{ 
selectCtrl: FormControl = new FormControl();
  inputType = 'password';
  visible = false;


  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  stateCtrl = new FormControl();
  states: CountryState[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];
}
	







