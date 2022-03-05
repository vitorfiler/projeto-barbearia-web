import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ProdutoService {

	constructor(private http: HttpClient) { }

	filtrar(estabelecimentoID: string, filtro: string, categoria: string): Observable<any> {

		return this.http.get(`${environment.URL_API}/produtos/filtro`, {
			params: {
				estabelecimento_ID: estabelecimentoID, filtroCategoria: filtro, categoria: categoria
			}, observe: 'response'
		})
	}
}
