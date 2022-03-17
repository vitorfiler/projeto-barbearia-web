
import { Cliente } from "./cliente";
import { Produto } from "./produto";

export class Reserva {
	id: number;
	dtAbertura: Date;
	dtFinalizacao: Date;
	codVendedor: string;
	codReserva: string;
	statusReserva: string;
	valorTotalReserva: number;
	motivoCancelamento: string;
	solicitaCancelamento: boolean;
	nomeCliente: string;
	produtos: Produto;
	estabelecimentoID: number;
	cliente: Cliente;

	constructor(reserva: Reserva = {} as Reserva) {
		Object.assign(this, reserva);
	}
}
