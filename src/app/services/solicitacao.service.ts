import { Observable } from 'rxjs';
import { Estabelecimento } from 'src/app/_models/estabelecimento';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CadSolicitacao } from '../_models/cad-solicitacao';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  constructor(private http: HttpClient) { }

  filtrar(estabelecimentoID: string, filtro: string, status: string, dt_inicial: string, dt_final: string): Observable<any> {

    return this.http.get(`${environment.URL_API}/solicitacoes/filtro`, {
      params: {
        estabelecimento_ID: estabelecimentoID, filtro: filtro, status: status || "", dt_final: dt_final, dt_inicial: dt_inicial,
      }, observe: 'response'
    })
  }

  getSolicitacoes(estabelecimentoID: string): Observable<any> {
    return this.http.get(`${environment.URL_API}/solicitacoes/todas`, {
      params: {
        estabelecimento_ID: estabelecimentoID,
      }, observe: 'response'
    })
  }


  alterarSolicitacao(solicitacao: CadSolicitacao): Observable<any> {
    return this.http.put(`${environment.URL_API}/solicitacoes`, solicitacao, { observe: "response" });
  }

}
