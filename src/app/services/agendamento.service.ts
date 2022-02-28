import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../_models/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private http: HttpClient) { }

  filtrar(estabelecimentoID: string, filtro: string, status: string, dt_inicial: string, dt_final: string): Observable<any> {

    return this.http.get(`${environment.URL_API}/agendamentos/filtro`, {
      params: {
        estabelecimento_ID: estabelecimentoID, filtro: filtro, status: status || "", dt_final: dt_final, dt_inicial: dt_inicial,
      }, observe: 'response'
    })
  }

  buscarAgendamentos(estabelecimentoID: string): Observable<any> {
    return this.http.get(`${environment.URL_API}/agendamentos/todas`, {
      params: {
        estabelecimento_ID: estabelecimentoID,
      }, observe: 'response'
    })
  }

  alterarAgendamento(body: Agendamento): Observable<any> {
    return this.http.put(`${environment.URL_API}/agendamentos`, body, { observe: "response"});
  }

  cadastrarAgendamento(body: Agendamento): Observable<any> {
    return this.http.post(`${environment.URL_API}/agendamentos`, body, { observe: "response" });
  }

  deleteAgendamento(agendamentoID: string): Observable<any>{
    return this.http.delete(`${environment.URL_API}/agendamentos`, {params: 
      {agendamento_ID: agendamentoID}, observe:'response'});
  }
}
