import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  dataSource = new MatTableDataSource<Servico>()
  servico: Servico;
	servicos: Servico[] = []

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
    this.inicializarFiltro() 
  }

  filtrar() {
		this.servicoService.filtrar(this.estabelecimentoID, this.filtroCategoria, this.categoria)
			.subscribe(resposta => {
				this.servico = resposta.body
				this.carregando = false;
				this.dataSource = new MatTableDataSource<Servico>(this.servicos)

			})
	}

  inicializarFiltro() { 
		this.form = this.fb.group({
			filtro: [''],
			categoria: ['']
		});
		this.categoria = this.selecaoCategoria[0].value;
	}

}
