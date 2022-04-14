import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalhePagamentoService {

  constructor(private http: HttpClient) { }

  detalharPagamento(): Observable<any> {
    return this.http.get(`${environment.URL_MOCKOON}/detalhe-do-pagamento`, { observe: 'response' })
}
}
