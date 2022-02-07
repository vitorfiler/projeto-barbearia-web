import { Cliente } from './cliente';

export class Solicitacao{
    id: number;
    cdSolicitacao: string;
    valor: number;
    nomeServico: string;
    tempoEstimado: string;
    dtAtendimento: string;
    responsavel: string;
    status: string;
    clienteID: number;
    estabelecimentoID: number;
    cliente: Cliente; 

    constructor(solicitacao: Solicitacao= {} as Solicitacao){
        Object.assign(this, solicitacao);
    }
}

