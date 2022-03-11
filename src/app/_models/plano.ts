import { Beneficio } from "./beneficio";

export class Plano {
    id: number;
    nome: string;
    preco: string;
    dsPlano: string;
    desconto: string;
    icone: string;
    beneficios: Beneficio [];
}