import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GraficosService {

	constructor(private http: HttpClient) { }

	dadosGrafico(): Observable<any> {
		return this.http.get(`${environment.URL_MOCKOON}/grafico/grafico-horizontal`, { observe: 'response' })
	}

}
