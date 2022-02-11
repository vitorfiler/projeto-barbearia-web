import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginService } from './login.service';
import { Estabelecimento } from '../_models/estabelecimento';



@Injectable({
  providedIn: 'root'
})
export class CommomService {

  constructor(private http: HttpClient,
    private route: Router,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) { }

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  logout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }

  get(urlName: string): Observable<any> {
    return this.http.get(`${environment.URL_API}${urlName}`, { observe: "response" });

  }

  post(urlName: string, estabelecimento: Estabelecimento): Observable<any> {
    return this.http.post(`${environment.URL_API}${urlName}`, estabelecimento, { observe: "response", headers: this.headers });
  }

  recuperarSenha(email: string): Observable<any> {
    return this.http.get(`${environment.URL_API}${environment.recuperarSenha}`, {
      params: {
        email: email,
      }, observe: "response", headers: this.headers
    });
  }

  putWithParams(urlName: string, body: string, clientId: string): Observable<any> {
    return this.http.put(`${environment.URL_API}${urlName}`, body, {
      params: {
        clienteID: clientId,
      }, observe: "response", headers: this.headers
    });
  }

  delete(urlName: string): Promise<any> {
    let promise = this.http.get(`${environment.URL_API}${urlName}`, { observe: "response", headers: this.headers }).toPromise();
    return promise
  }

  validaSessao() {
    return this.loginService.validaSessao();
  }

  formatDate(date: Date) {
    let day: string = date.getDate().toString();
    day = +day < 10 ? '0' + day : day;
    let month: string = (date.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  //metodo para buscar cep da API viaCep
  consultaCep(cep: string): Observable<any> {
    this.headers.set('Access-Control-Allow-Origin', '*');
    this.http.get(`https://cors-anywhere.herokuapp.com//viacep.com.br/ws/88058400/json`);
    return this.http.get(`http://viacep.com.br/ws/${cep}/json`, { observe: "response", headers: this.headers });
  }
}
