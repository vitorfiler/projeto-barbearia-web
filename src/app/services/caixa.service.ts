
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaixaService {

 
  constructor( private http: HttpClient) { }

  fecharCaixa(): Observable<any>{
    return this.http.get(`${environment.URL_MOCKOON}/fechamento-caixa`, {observe: 'response'})
  }
}
