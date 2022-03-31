import { fadeInUp400ms } from './../../../../@vex/animations/fade-in-up.animation';
import { stagger20ms } from './../../../../@vex/animations/stagger.animation';
import { CaixaService } from './../../../services/caixa.service';
import { Component, OnInit, ViewChild,  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


export class Fechamentocaixa{
      data: string
      descricao: string
      valor: number  
}

@Component({
    selector: 'vex-fechamento-caixa',
    templateUrl: 'fechamento-caixa.component.html',
    styleUrls: ['fechamento-caixa.component.scss'],
    animations: [
        fadeInUp400ms,
        stagger20ms 
    ]
})

export class ModalFechamentoCaixa implements OnInit{

  
    dados: Fechamentocaixa[] = [];

    dataSource = new MatTableDataSource<Fechamentocaixa>()
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) matSort: MatSort;

    displayedColumns: string[] = ['Data', 'Descrição', 'Valor'];
    //const dados = 
    constructor(
        public dialogRef: MatDialogRef<ModalFechamentoCaixa>,
        public caixaService: CaixaService
       
    ) {}
    
        ngOnInit(): void {
            this.fecharCaixa()
      }

      fecharCaixa(){
        this.caixaService.fecharCaixa().subscribe(response =>{
            console.log(response)
            this.dataSource = new MatTableDataSource<Fechamentocaixa>(response.body)
        })
      }

      cancelar(): void {
        this.dialogRef.close();
      }
}