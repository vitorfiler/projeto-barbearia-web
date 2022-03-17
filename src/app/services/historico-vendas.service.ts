import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricoVendasService {

  constructor(private http: HttpClient) { }

  filtrar(estabelecimentoID: string, dt_inicial: string, dt_final: string): Observable<any> {

    
    return this.http.get(`${environment.URL_Mockon}/historico-vendas`, {
      params: {
        estabelecimento_ID: estabelecimentoID, dt_inicial: dt_inicial, dt_final: dt_final, 
      }, observe: 'response'
    })
  }

  filtrarMockon(estabelecimentoID: string, dt_inicial: string, dt_final: string): Observable<any> {

    
    return this.http.get(`${environment.URL_Mockon}`, {
       observe: 'response'
    })
  }
}
