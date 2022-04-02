export class HistoricoVendas{
    id: number;
    dtInicial: string;
    dtFinal: string;
    valorTotal: number;
    descricao: string;
    tipoHistorico: string;
    estabelecimentoID: number;
    expandir?: boolean;
}