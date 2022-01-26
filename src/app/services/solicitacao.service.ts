import { Observable } from 'rxjs';
import { Estabelecimento } from 'src/app/_models/estabelecimento';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  headers: HttpHeaders = new HttpHeaders({
     'Content-Type': 'application/json' ,
      'Authorization': localStorage.getItem('token').replace('"',"").replace('"',"")
    })

  constructor(private http: HttpClient) { }

  filtrar(estabelecimentoID: string, filtro: string): Observable<any>{

   return this.http.get(`${environment.URL_API}/solicitacoes/filtro`, {params:{
      estabelecimento_ID: estabelecimentoID, filtro:filtro
    }, observe:'response', headers: this.headers})
  }

  getSolicitacoes(estabelecimentoID: string): Observable<any>{


    return this.http.get(`${environment.URL_API}/solicitacoes/todas`, {params:{
      estabelecimento_ID: estabelecimentoID,
    }, observe: 'response', headers: this.headers})
  }
}
