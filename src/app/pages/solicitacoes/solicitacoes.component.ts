import { Solicitacao } from './../../_models/solicitacao';
import { MatTableDataSource } from '@angular/material/table';
import { Estabelecimento } from 'src/app/_models/estabelecimento';
import { SolicitacaoService } from './../../services/solicitacao.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss']
})
export class SolicitacoesComponent implements OnInit {

  estabelecimentoID = '1'
  displayedColumns = ['cliente', 'servico', 'tempo', 'valor', 'data', 'responsavel', 'status']
  
  dataSource = new MatTableDataSource<Solicitacao>()

  solicitacoes: Solicitacao [] = [] 

  status: any[] = [
    {value: 'PENDENTE', viewValue: 'Pendente'},
    {value: 'ACEITO', viewValue: 'Aceito'},
    {value: 'RECUSADO', viewValue: 'Recusado'},
  ];
  
  form: FormGroup;
  constructor(private router: Router,
		private fb: FormBuilder,
    private solicitacaoService : SolicitacaoService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
			filtro: ['', Validators.required],
		});

    this.listar()
  }

  filtrar(){
    let filtro = this.form.get('filtro').value
   
    this.solicitacaoService.filtrar(this.estabelecimentoID,filtro).subscribe(resposta => {
      this.solicitacoes = resposta.body
      /*renderizando a tabela*/
      this.dataSource = new MatTableDataSource<Solicitacao>(this.solicitacoes) 
    })
  }

  listar(){
  
    this.solicitacaoService.getSolicitacoes(this.estabelecimentoID).subscribe(resposta => {
        this.solicitacoes = resposta.body

        this.dataSource = new MatTableDataSource<Solicitacao>(this.solicitacoes)
    })
  }

}
