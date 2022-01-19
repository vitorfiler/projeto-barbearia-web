import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SolicitacoesService {
  constructor(private http: HttpClient) {
  }

  getSolicitacoes(): Observable<any> {
    return this.http.get(`http://localhost:8081/solicitacoes/todas`, { observe: "response" })
    // return this.http.get(`${environment.URL_API}/solicitacoes/todas`, { observe: "response" })
  }
}

