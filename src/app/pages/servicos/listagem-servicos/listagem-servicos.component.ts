import { ServicoService } from './../../../services/servico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Servico } from 'src/app/_models/servico';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';

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

  constructor(private servicoService: ServicoService) { }

    servicos: Servico[] = []

  ngOnInit(): void {
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


  ngAfterViewInit() {
		this.dataSource.sort = this.matSort;
	}
  

}
