import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icBusiness from '@iconify/icons-ic/twotone-business';
import icMail from '@iconify/icons-ic/twotone-mail';
import icChat from '@iconify/icons-ic/twotone-chat';
import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import { Card } from 'src/app/_models/card';
import { ExibicaoServicosComponent } from 'src/app/pages/servicos/exibicao-servicos/exibicao-servicos.component';
import { EventEmitterService } from 'src/app/services/event.service';
import ModalOcultarProduto from 'src/app/pages/modais/produtos-modal/modal-ocultar-produtos/modal-ocultar-produtos';
import { MatDialog } from '@angular/material/dialog';
import ModalOcultarServico from 'src/app/pages/modais/servico-modais/modal-ocultar-servicos/modal-ocultar-servico';
import { ModalCadastrarEditarServico } from 'src/app/pages/modais/servico-modais/modal-cadastrar-editar-servico/modal-cadastrar-editar-servico';
import { ModalAdicionarProduto } from 'src/app/pages/modais/produtos-modal/modal-adicionar-editar-produto/modal-adicionar-editar-produto';
import { Servico } from 'src/app/_models/servico';
import { ModalDeletarServico } from 'src/app/pages/modais/servico-modais/modal-deletar-servico/modal-deletar-servico';

@Component({
  selector: 'vex-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Input() ehServico: boolean;
  @Output() openContact = new EventEmitter<Card['id']>();
  @Output() toggleStar = new EventEmitter<Card['id']>();

  icBusiness = icBusiness;
  icPhone = icPhone;
  icMail = icMail;
  icChat = icChat;
  icStar = icStar;
  icStarBorder = icStarBorder;

  constructor(public dialog: MatDialog,) { }

  ngOnInit() {
  }

  emitToggleStar(event: MouseEvent, contactId: Card['id']) {
    event.stopPropagation();
    this.toggleStar.emit(contactId);
  }

	trocarStatusServico(card) {
		let dialogRef; 
    if(this.ehServico){
      this.dialog.open(ModalOcultarServico, {
        data: card
      });
    }else{
      this.dialog.open(ModalOcultarProduto, {
        data: card
      });
    }
		dialogRef.afterClosed().subscribe(result => { 
		});
	}

  abrirModalAdicionarServico(card) {
		let dialogRef;
    if(this.ehServico){
      dialogRef = this.dialog.open(ModalCadastrarEditarServico, {
        data: card
      });
    }else{
      dialogRef = this.dialog.open(ModalAdicionarProduto, {
        data: card
      });
    }
		dialogRef.afterClosed().subscribe(result => {});
	}

  deletarServico(servico: Card) {
		const dialogRef = this.dialog.open(ModalDeletarServico, {
			data: servico
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}
}
