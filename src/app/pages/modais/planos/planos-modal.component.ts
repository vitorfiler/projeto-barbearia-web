import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanosServiceComponent } from 'src/app/services/planos.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { Plano } from 'src/app/_models/plano';

const BASIC = 4;
const PREMIUM = 14;
const PRO = 24;
@Component({
  selector: 'vex-planos',
  templateUrl: './planos-modal.component.html',
  styleUrls: ['./planos-modal.component.scss']
})
export class PlanosModalComponent implements OnInit {

  estabelecimentoID = localStorage.getItem('estabelecimento_ID')

  listaPlanos: Plano[] = [];

  constructor(public dialog: MatDialog,
    private planosServices: PlanosServiceComponent,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.listarPlanos();
  }

  listarPlanos() {
    this.planosServices.listarPlanos().subscribe(resposta => {
      this.listaPlanos = resposta.body;
      this.listaPlanos.forEach(plano => {
        plano.id == BASIC ? plano.icone = "assets/img/icones/basico.svg" 
        : plano.id == PREMIUM ? plano.icone = "assets/img/icones/premium.svg"
        : plano.icone = "assets/img/icones/pro.svg"
      });
      console.log(this.listaPlanos);
    }, (error) => {
      console.log(error);
      this.snackbar.open(MessagesSnackBar.LISTAR_PLANO_ERRO, 'Fechar', { duration: 4000 })
    }
    )
  }

  contratarPlano(planoID: number) {
    const body: any = {
      estabelecimento_ID: this.estabelecimentoID,
      plano_ID: planoID
    }
    this.planosServices.contratarPlano(body).subscribe(() => {
      this.snackbar.open(MessagesSnackBar.CONTRATAR_PLANO_SUCESSO, 'Fechar', { duration: 4000 })
    }, (error) => {
      console.log(error);
      this.snackbar.open(MessagesSnackBar.CONTRATAR_PLANO_ERRO, 'Fechar', { duration: 4000 })
    })
  }

}



