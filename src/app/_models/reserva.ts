
export class Reserva {

  id: number;
  cliente: string;
  produto: string;
  quantidade: string;
  valor: number;
  dataRetirada: Date;
  status: string;
  estabelecimentoID: number;
  value: string;
  viewValue: string;

  constructor(value: string, viewValue: string) {
    this.value = value;
    this.viewValue = viewValue;
  }
}
