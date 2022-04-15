import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServicoService } from 'src/app/services/servico.service';
import { Categoria } from 'src/app/_models/categoria';
import { Servico } from 'src/app/_models/servico';

@Component({
  selector: 'vex-listagem-promocoes',
  templateUrl: './listagem-promocoes.component.html',
  styleUrls: ['./listagem-promocoes.component.scss']
})
export class ListagemPromocoesComponent implements OnInit {

  form: FormGroup;
  categoria: string;
  filtroCategoria: string;

  dataSource = new MatTableDataSource<any>()
  displayedColumns: string[] = ['nome', 'descricao', 'valorPromocional', 'acoes'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) matSort: MatSort;

  @Input() promocoes: any[] = []
  estabelecimentoID = localStorage.getItem('estabelecimento_ID')
	public carregando = false;

  selecaoCategoria: Categoria[] = [
		{ value: 'TODOS', viewValue: 'Todos' },
		{ value: 'SERVICOS', viewValue: 'Serviços' },
		{ value: 'PRODUTOS', viewValue: 'Produtos' },
	];

  constructor(
    private servicoService: ServicoService,
    private fb: FormBuilder,
    ){}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.promocoes)
  }

}
