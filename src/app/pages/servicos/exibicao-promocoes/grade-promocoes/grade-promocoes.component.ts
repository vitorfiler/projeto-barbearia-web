import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vex-grade-promocoes',
  templateUrl: './grade-promocoes.component.html',
  styleUrls: ['./grade-promocoes.component.scss']
})
export class GradePromocoesComponent implements OnInit {


  @Input() promocoes: any[] = []
  estabelecimentoID = localStorage.getItem('estabelecimento_ID')
  public carregando = false;



  constructor(
  ) { }

  ngOnInit(): void {
  }
}
