import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaixaService {

  constructor(private http: HttpClient) { }

  filtrar(estabelecimentoID: string, filtro: string, status: string): Observable<any> {

    return this.http.get(`${environment.URL_API}/caixa/filtro`, {
      params: {
        estabelecimento_ID: estabelecimentoID, filtroStatus: filtro, status: status
      }, observe: 'response'
    })
  }

}
