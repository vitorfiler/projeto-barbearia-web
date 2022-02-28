import { Cliente } from './cliente';

export class Agendamento{
    id: number;
    cdAgendamento: string;
    valor: number;
    nomeServico: string;
    tempoEstimado: string;
    dtAtendimento: string;
    responsavel: string;
    status: string;
    clienteID: number;
    estabelecimentoID: number;
    cliente: Cliente; 

    constructor(agendamento: Agendamento= {} as Agendamento){
        Object.assign(this, agendamento);
    }
}

