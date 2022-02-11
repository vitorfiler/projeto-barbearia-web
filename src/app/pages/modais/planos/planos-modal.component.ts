import { Component, OnInit } from '@angular/core';
import icBeenhere from '@iconify/icons-ic/twotone-beenhere';
import icStars from '@iconify/icons-ic/twotone-stars';
import icBusinessCenter from '@iconify/icons-ic/twotone-business-center';
import { MatDialog } from '@angular/material/dialog';
import { PlanosServiceComponent } from 'src/app/services/planos.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';

@Component({
  selector: 'vex-planos',
  templateUrl: './planos-modal.component.html',
})
export class PlanosModalComponent implements OnInit {

  estabelecimentoID = localStorage.getItem('estabelecimento_ID')

  icBeenhere = icBeenhere;
  icStars = icStars;
  icBusinessCenter = icBusinessCenter;

  listaPlanos: any[] = [];

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
      console.log(this.listaPlanos);
    }, (error) => {
      console.log(error);
      this.snackbar.open(MessagesSnackBar.ALTERAÇÃO_SOLICITACAO_ERRO, 'Fechar', { duration: 4000 })
    }
    )
  }

  contratarPlano(planoID: number){
    const body: any = {
      estabelecimento_ID: this.estabelecimentoID,
      plano_ID: planoID
    }
    this.planosServices.contratarPlano(body).subscribe(() => {
			this.snackbar.open(MessagesSnackBar.CADASTRO_SOLICITACAO_SUCESSO, 'Fechar', { duration: 4000 })
		}, (error) => {
			console.log(error);
			this.snackbar.open(MessagesSnackBar.CADASTRO_SOLICITACAO_ERRO, 'Fechar', { duration: 4000 })
		})
  }

}



