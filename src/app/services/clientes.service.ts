import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  filtrarCliente(filtro:string):Observable<any>{
    return this.http.get(`${environment.URL_API}/clientes/filtro`, {params:{
      filtro: filtro
    }, observe: 'response'})
  }


  buscarClientesAtivos():Observable<any>{
    return this.http.get(`${environment.URL_API}/clientes/ativos`, {observe: 'response'})
  }
}
