import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromocaoService {

  constructor(private http: HttpClient) { }

  obterPromocoes(estabelecimentoId: string): Observable<any>{
    return this.http.get(`${environment.URL_API}/promocoes`, {params:{
      estabelecimento_ID: estabelecimentoId
    }, observe: "response"});
  }
}
