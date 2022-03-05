import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ReservasService {

	constructor(private http: HttpClient) { }

	filtrar(estabelecimentoID: string, filtro: string, status: string, dt_inicial: string, dt_final: string): Observable<any> {

		return this.http.get(`${environment.URL_API}/reservas/filtro`, {
			params: {
				estabelecimento_ID: estabelecimentoID, 
				filtroReserva: filtro, 
				selecaoStatus: status, 
				dt_inicial: dt_inicial, 
				dt_final: dt_final
			}, observe: 'response'
		})
	}

}