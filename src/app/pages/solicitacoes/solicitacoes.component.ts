import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitacoesService } from './../../services/solicitacoes.service';
import { Solicitacoes } from 'src/app/_models/solicitacoes';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'vex-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss'],
})
export class SolicitacoesComponent implements OnInit {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = ['clienteID', 'nomeServico', 'tempoEstimado', 'valor', 'dtAtendimento', 'responsavel', 'status'];
  dataSource = new MatTableDataSource<Solicitacoes>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  solicitacoes: Solicitacoes[] = [];
  constructor(private solicitacoesService: SolicitacoesService) {
  }

  ngOnInit(): void {
    this.getSolicitacoes();
  }

  getSolicitacoes() {
    let estabelecimento_id = '1';
    this.solicitacoesService.getSolicitacoes(estabelecimento_id).subscribe(response => {
      if (response) {
        this.solicitacoes = response.body;
        console.log(this.solicitacoes[0].cliente);
        this.dataSource = new MatTableDataSource<Solicitacoes>(this.solicitacoes);
      }

    })

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}




