import { ServicoService } from './../../../services/servico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Servico } from 'src/app/_models/servico';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from 'src/app/_models/categoria';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog/dialog';
import { ModalAdicionarServico } from '../../modais/servicoes-modais/modal-adicionar-servicos';

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
  form: FormGroup;
  servicos: Servico[] = []
  selecaoCategoria: Categoria[] = [
    { value: 'TODOS', viewValue: 'Todos' },
    { value: 'CABELOF', viewValue: 'Cabelo Feminino' },
    { value: 'CABELOM', viewValue: 'Cabelo Masculino' },
    { value: 'UNHAEPELE', viewValue: 'Unha e pele' },
  ];
  constructor(private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private servicoService: ServicoService) {

  }

  inicializarFiltro() {
    this.form = this.fb.group({
      categoria: [this.selecaoCategoria[0].value]
    });
  }

  ngOnInit(): void {
    this.inicializarFiltro();
    this.listarServicos();
  }

  abrirModalAdicionarServico(isAdicionar: boolean) {
    let dialogRef;

    if (isAdicionar) {
      dialogRef = this.dialog.open(ModalAdicionarServico)
    }
  }
  dataSource = new MatTableDataSource<Servico>()
  displayedColumns: string[] = ['categoria', 'descricao', 'tempoEstimado', 'valor', 'acoes'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  estabelecimentoID = localStorage.getItem('estabelecimento_ID')
  public carregando = false;

  servico: Servico;



  listarServicos() {
    this.carregando = true;
    this.servicoService.listarServicos(this.estabelecimentoID).subscribe(response => {
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
