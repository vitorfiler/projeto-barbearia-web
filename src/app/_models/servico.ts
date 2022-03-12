export class Servico {
    id: number;
    nomeServico: string;
    categoria: string;
    dsServico: string;
    tempoEstimado: string;
    valor: number; 
    valorPromocional: string;
    ativo: boolean;
    promocional: boolean;
    estabelecimentoID: number;

    
    constructor(servico: Servico= {} as Servico){
        Object.assign(this, servico);
    }
}
