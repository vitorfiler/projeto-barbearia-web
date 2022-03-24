import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../_models/produto';

@Injectable({
	providedIn: 'root'
})
export class ProdutoService {

	constructor(private http: HttpClient) { }

	//trocar parametro filtroReserva após back end for alterado
	filtrar(estabelecimentoID: string, filtro: string, categoria: string): Observable<any> {
		return this.http.get(`${environment.URL_API}/produtos/filtro`, {
			params: {
				estabelecimento_ID: estabelecimentoID, filtro: filtro, categoria: categoria
			}, observe: 'response'
		})
	}

	listarProdutos(estabelecimentoID: string): Observable<any> {
		return this.http.get(`${environment.URL_API}/produtos/todos`, {
			params: {
				estabelecimento_ID: estabelecimentoID,
			}, observe: 'response'
		});
	}

	cadastrar(body: Produto) {
		return this.http.post(`${environment.URL_API}/produtos`, body, { observe: "response" });
	}

	alterarProduto(body: Produto): Observable<any> {
		return this.http.put(`${environment.URL_API}/produtos`, body, { observe: "response" });
	}

	deletarProduto(produtoId: string): Observable<any> {
		return this.http.delete(`${environment.URL_API}/produtos`, {
			params: {
				produto_ID: produtoId
			}, observe: "response"
		});
	}

}
