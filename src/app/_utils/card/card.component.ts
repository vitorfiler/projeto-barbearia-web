import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icBusiness from '@iconify/icons-ic/twotone-business';
import icMail from '@iconify/icons-ic/twotone-mail';
import icChat from '@iconify/icons-ic/twotone-chat';
import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import { Card } from 'src/app/_models/card';
import { ExibicaoServicosComponent } from 'src/app/pages/servicos/exibicao-servicos/exibicao-servicos.component';

@Component({
  selector: 'vex-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Output() openContact = new EventEmitter<Card['id']>();
  @Output() toggleStar = new EventEmitter<Card['id']>();

  icBusiness = icBusiness;
  icPhone = icPhone;
  icMail = icMail;
  icChat = icChat;
  icStar = icStar;
  icStarBorder = icStarBorder;
  exibicaoServicosComponent = new ExibicaoServicosComponent()


  constructor() { }

  ngOnInit() {
  }

  emitToggleStar(event: MouseEvent, contactId: Card['id']) {
    event.stopPropagation();
    this.toggleStar.emit(contactId);
  }

  
}
