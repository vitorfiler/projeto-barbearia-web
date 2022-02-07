export class Filtro{
    filtro: string;
    status: string;
    dt_inicial: string;
    dt_final: string;

    constructor(filtro: string, status: string, dt_inicial: string, dt_final: string){
        this.filtro = filtro
        this.status = status
        this.dt_inicial = dt_inicial
        this.dt_final = dt_final
    }
}