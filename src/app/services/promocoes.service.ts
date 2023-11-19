import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromocoesService {

  constructor(private http: HttpClient) { }

  // trocar camminho de api para /promocoes/todos após api for concluida
  listarPromocoes(estabelecimentoID: string): Observable<any> {
    return this.http.get(`${environment.URL_API}/produtos/todos`, {
      params: {
        estabelecimento_ID: estabelecimentoID,
      }, observe: 'response'
    });
  }
}
