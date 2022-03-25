import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalFechamentoCaixa } from '../../modais/fechamento-de-caixa-modal/fechamento-caixa.component';

@Component({
  selector: 'vex-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.scss']
})
export class CaixaComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  abrirFechamentoCaixa(): void {
    const dialogRef = this.dialog.open(ModalFechamentoCaixa, {
      width: '60%',
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}
