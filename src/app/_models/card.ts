import { Servico } from "./servico";
import { Produto } from './produto';
import { Promocao } from './promocao';

export class Card {
    id?: number;
    imagem?: string;
    codigo?: number;
    categoria?: string;
    nome?: string;
    descricao?: string;
    qtdEstoque?: number;
    valor?: number;
    valorPromocional?: number;
    ativo?: boolean;
    promocional?: boolean;
    estabelecimentoID?: number;

    constructor(card: Servico | Produto | Promocao){
      this.id = card.id;
      this.nome = card.nome;
      this.categoria = card.categoria;
      this.descricao = card.descricao;
      this.valor = card.valor;
      this.valorPromocional = card.valorPromocional;
      this.promocional = card.promocional;
      this.ativo = card.ativo;
      this.estabelecimentoID = card.estabelecimentoID;
    }
  }
  