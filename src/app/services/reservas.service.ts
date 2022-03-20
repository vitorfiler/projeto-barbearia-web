import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ReservasService {

	constructor(private http: HttpClient) { }

	filtrar(estabelecimentoID: string, filtroReserva: string, selecaoStatus: string, dt_inicial: string, dt_final?: string): Observable<any> {

		return this.http.get(`${environment.URL_API}/reservas/filtro`, {
			params: {
				estabelecimento_ID: estabelecimentoID,
				filtro: filtroReserva,
				status: selecaoStatus || "",
				dt_inicial: dt_inicial,
				dt_final: dt_final
			}, observe: 'response'
		})
	}
	listarReservas(estabelecimentoID: string): Observable<any> {
		return this.http.get(`${environment.URL_API}/reservas/todas`, {
			params: {
				estabelecimento_ID: estabelecimentoID,
			}, observe: 'response'
		});
	}

}
