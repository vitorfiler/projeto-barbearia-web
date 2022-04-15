import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from 'src/@vex/animations/scale-fade-in.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { PromocaoService } from 'src/app/services/promocao.service';
import { ServicoService } from 'src/app/services/servico.service';
import { Categoria } from 'src/app/_models/categoria';


@Component({
  selector: 'vex-exibicao-promocoes',
  templateUrl: './exibicao-promocoes.component.html',
  styleUrls: ['./exibicao-promocoes.component.scss'],
  animations: [
    scaleFadeIn400ms,
    fadeInUp400ms,
    stagger20ms
  ]
})
export class ExibicaoPromocoesComponent implements OnInit {


  form: FormGroup;
  categoria: string;
  filtroCategoria: string;


  promocoes: any[] = []
  label: String = "promoções";

  promocoesEmGrade: boolean = false;

  estabelecimentoID = localStorage.getItem('estabelecimento_ID')
  public carregando = false;

  selecaoCategoria: Categoria[] = [
    { value: 'SERVICOS', viewValue: 'Serviços' },
    { value: 'PRODUTOS', viewValue: 'Produtos' },
  ];

  constructor(
    private promocaoService: PromocaoService,
    private servicoService: ServicoService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.inicializarFiltro()
    this.listar();
  }

  listar() {
    this.promocaoService.obterPromocoes(this.estabelecimentoID).subscribe(response => {
      console.log(response.body);
      this.promocoes = response.body.servicos;
      console.log(this.promocoes);
    }, (error) => {
      console.log(error);
    });
  }

  botaoVisualizacao() {
    this.promocoesEmGrade = this.promocoesEmGrade ? false : true
  }

  filtrar() {
    this.servicoService.filtrar(this.estabelecimentoID, this.filtroCategoria, this.categoria)
      .subscribe(resposta => {
        this.promocoes = resposta.body
        this.carregando = false;
        // this.dataSource = new MatTableDataSource<Servico>(this.promocoes)
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
