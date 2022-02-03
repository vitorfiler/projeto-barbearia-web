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

  filtrar(estabelecimentoID: string, filtro: string): Observable<any>{

   return this.http.get(`${environment.URL_API}/solicitacoes/filtro`, {params:{
      estabelecimento_ID: estabelecimentoID, filtro:filtro,
      dt_inicial: '1989-12-12',
      dt_final: '2345-12-12',
      status: 'TODOS'
    }, observe:'response'})
  }

  getSolicitacoes(estabelecimentoID: string): Observable<any>{
    return this.http.get(`${environment.URL_API}/solicitacoes/todas`, {params:{
      estabelecimento_ID: estabelecimentoID,
    }, observe: 'response'})
  }

  alterarSolicitacao(solicitacao: CadSolicitacao): Observable<any>{
    return this.http.put(`${environment.URL_API}/solicitacoes`, solicitacao,{ observe: "response"});
  }
}
