import { ServicoService } from './../../../services/servico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Servico } from 'src/app/_models/servico';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitterService } from 'src/app/services/event.service';
import ModalServicoPromocional from '../../modais/servico-modais/modal-servico-promocional/modal-servico-promocional';
import { ModalDeletarServico } from '../../modais/servico-modais/modal-deletar-servico/modal-deletar-servico';
import ModalOcultarServico from '../../modais/servico-modais/modal-ocultar-servicos/modal-ocultar-servico';

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

  dataSource = new MatTableDataSource<Servico>()
	displayedColumns: string[] = ['categoria', 'descricao', 'tempoEstimado', 'valor',  'acoes'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) matSort: MatSort;

  estabelecimentoID = localStorage.getItem('estabelecimento_ID')
  public carregando = false;

  servico: Servico;
  servicos: Servico[] = []

  constructor(private servicoService: ServicoService,
              public dialog: MatDialog) { }


  ngOnInit(): void {
    EventEmitterService.get('buscarServicos').subscribe(() => this.listarServicos())
    this.listarServicos()
  }

  listarServicos(){
    this.carregando = true;
    this.servicoService.listarServicos(this.estabelecimentoID).subscribe(response =>{
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


  ngAfterViewInit() {
		this.dataSource.sort = this.matSort;
	}
  

}
