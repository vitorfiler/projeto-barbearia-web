import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class PlanosServiceComponent {

    constructor(private http: HttpClient) { }

    listarPlanos(): Observable<any> {
        return this.http.get(`${environment.URL_API}/planos`, { observe: 'response' })
    }

    contratarPlano(body: string): Observable<any> {
        return this.http.post(`${environment.URL_API}/planos`, body);
    }

}
