import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PromocoesService } from 'src/app/services/promocoes.service';
import { Card } from 'src/app/_models/card';
import { Produto } from 'src/app/_models/produto';

@Component({
  selector: 'vex-grade-promocoes',
  templateUrl: './grade-promocoes.component.html',
  styleUrls: ['./grade-promocoes.component.scss']
})
export class GradePromocoesComponent implements OnInit {


  //variaveis
  cards: Card[];
  estabelecimentoID = localStorage.getItem('estabelecimento_ID')
  @Input() promocoes: Produto[] = []
  label: string = "promocoes";
  promocoesEmGrade: boolean = false;
  public carregando = false;


  //visualização em grade e lista
  visible = false;
  alturaTela: any;
  larguraTela: any;
  mostraBotaoListaGradeNaTabela = false;
  mostraBotaoListaGradeNoFiltro = false;

  //tabela	
  dataSource = new MatTableDataSource<Produto>()
  displayedColumns: string[] = ['nomeProduto', 'dsProduto', 'qtdEstoque', 'valor', 'valorPromocional', 'acoes'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;




  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private promocoesService: PromocoesService) {
    this.botaoGradeListaPorPixel();
  }

  ngOnInit(): void {
  }

  listarProdutos() {
    this.carregando = true;
    this.promocoesService.listarPromocoes(this.estabelecimentoID).subscribe(response => {
      this.carregando = false;
      this.promocoes = response.body
      this.dataSource = new MatTableDataSource<Produto>(this.promocoes)
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.matSort
      })
      this.cards = this.promocoes.map(s => new Card(s))
      this.dataSource.paginator = this.paginator
    }, (error) => {
      console.log(error);
      this.carregando = false;
    })
  }


  @HostListener('window:resize', ['$event'])
  botaoGradeListaPorPixel(event?) {

    this.alturaTela = window.innerHeight;
    this.larguraTela = window.innerWidth;
    if (this.larguraTela >= 407 && this.larguraTela <= 767) {
      this.mostraBotaoListaGradeNaTabela = true
      this.mostraBotaoListaGradeNoFiltro = false
    } else if (this.larguraTela > 767) {
      this.mostraBotaoListaGradeNaTabela = false
      this.mostraBotaoListaGradeNoFiltro = true;
    } else {
      this.mostraBotaoListaGradeNaTabela = false
      this.mostraBotaoListaGradeNoFiltro = false;
    }
  }

  botaoVisualizacao() {
    this.promocoesEmGrade = this.promocoesEmGrade ? false : true
  }



}
