import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }

  filtrar(estabelecimentoID: string, filtroReserva: string, filtroData: string, selecaoStatus: string): Observable<any> {

    return this.http.get(`${environment.URL_API}/reservas/filtro`, {
      params: {
        estabelecimento_ID: estabelecimentoID, filtroReserva: filtroReserva, selecaoStatus: selecaoStatus || "", filtroData: filtroData,
      }, observe: 'response'
    })
  }

}
