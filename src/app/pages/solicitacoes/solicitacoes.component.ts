import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'vex-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss']
})
export class SolicitacoesComponent implements OnInit {

  
  displayedColumns: string[] = ['cliente', 'servico', 'tempo', 'valor', 'data', 'responsavel', 'status'];
  dataSource = new MatTableDataSource<Solicitacoes>(SOLICITACOES);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
}

export interface Solicitacoes {
  cliente: string;
	servico: string;
	tempo: number;
	valor: number; 
	dataSolictacao: string; 
	responsavel: string; 
	status: string;
}

const SOLICITACOES: Solicitacoes[] = [
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},
  {cliente: 'Joao', servico: 'Corte', tempo: 30, valor: 40.00, dataSolictacao: '17-01-2022', responsavel:'Vitor', status:'Aceito'},

];
