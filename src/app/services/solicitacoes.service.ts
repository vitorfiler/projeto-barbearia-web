import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SolicitacoesService {

  token: string = window.localStorage.getItem("token")

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization':
  localStorage.getItem('token').replace('"',"").replace('"',"")})
  constructor(private http: HttpClient) {
  }

  getSolicitacoes(estabelecimento_id: string): Observable<any> {
    // return this.http.get(`http://localhost:8081/solicitacoes/todas`, { observe: "response" })
    console.log(this.token);
    return this.http.get(`${environment.URL_API}/solicitacoes/todas`, {
      params: {
        estabelecimento_id: estabelecimento_id
      }, observe: "response", headers: this.headers
    })
  }
}

