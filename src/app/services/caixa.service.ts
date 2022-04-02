import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaixaService {

  constructor( private http: HttpClient) { }

  fecharCaixa(): Observable<any>{
    return this.http.get(`${environment.URL_MOCKOON}/fechamento-caixa`, {observe: 'response'})
  }
  
  filtrar(estabelecimentoID: string, filtro: string, status: string): Observable<any> {

    return this.http.get(`${environment.URL_API}/caixa/filtro`, {
      params: {
        estabelecimento_ID: estabelecimentoID, filtroStatus: filtro, status: status
      }, observe: 'response'
    })
  }

  buscarServicos(): Observable<any> {
    return this.http.get(`${environment.URL_MOCKOON}/caixa/servicos`, {observe: 'response'})
  }
  buscarProdutos(): Observable<any> {
    return this.http.get(`${environment.URL_MOCKOON}/caixa/produtos`, {observe: 'response'})
  }
  detalharPagamento(): Observable<any> {
    return this.http.get(`${environment.URL_MOCKOON}/detalhe-do-pagamento`, { observe: 'response' })
  }

}
