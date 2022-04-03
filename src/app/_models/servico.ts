export class Servico {
    id: number;
    nome: string;
    categoria: string;
    descricao: string;
    tempoEstimado: string;
    valor: number; 
    valorPromocional: number;
    ativo: boolean;
    promocional: boolean;
    estabelecimentoID: number;
    qtdEstoque: number;

    
    constructor(servico: Servico= {} as Servico){
        Object.assign(this, servico);
    }
}
