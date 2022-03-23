export class Produto {
	id: number;
	codProduto: number;
	categoria: string;
	nomeProduto: string;
	dsProduto: string;
	qtdEstoque: number;
	valor: number;
	valorPromocional: number;
	ativo: boolean;
	promocional: boolean;
	estabelecimentoID: number;

	constructor(produto: Produto = {} as Produto) {
		Object.assign(this, produto);
	}
}