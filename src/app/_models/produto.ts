export class Produto {
	id: number;
	codigo: number;
	categoria: string;
	nome: string;
	descricao: string;
	qtdEstoque: number;
	valor: number;
	valorPromocional: number;
	ativo: boolean;
	promocional: boolean;
	estabelecimentoID: number;
	tempoEstimado: string;

	constructor(produto: Produto = {} as Produto) {
		Object.assign(this, produto);
	}
}