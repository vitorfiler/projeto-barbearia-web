import { environment } from './../../environments/environment';
import { Servico } from 'src/app/_models/servico';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }

  listarServicos(estabelecimentoID: string):Observable<any>{
    return this.http.get(`${environment.URL_API}/servicos/todos`, {
      params:{
        estabelecimento_ID: estabelecimentoID,
      },observe: 'response'
    });
  }

  trocarStatusServico(body: Servico): Observable<any> {
      return this.http.put(`${environment.URL_API}/servicos`, body, { observe: "response"});   
  }

  deletarServico(servicoId: string): Observable<any> {
    return this.http.delete(`${environment.URL_API}/servicos`, { params:{
      servico_ID: servicoId
    }, observe: "response"});   
}
}
