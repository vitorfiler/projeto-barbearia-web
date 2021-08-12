import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private routes: ActivatedRoute) { }
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  urlLogin = `${environment.URL_API}/login`;
    
  // login(username: string, password: string): Observable<any> {
  //   const body: any = {
  //     "username": username,
  //     "password": password
  //   };
  //   return this.http.post(this.urlLogin, body, {observe: "response",});
  // }

//   login(username: string, password: string): Observable<any> {
//     return this.http
//         .get(`${this.urlLogin}/${username}/${password}`, { observe: "response"})
// }

  login(username: string, password: string): Observable<any>{
    const body: any = {
      "username": username,
      "password": password
    };
    return this.http.post(`${this.urlLogin}`, body, { observe: "response", headers: this.headers });
  }

  // var validaSessao = this.commomService.validaSessao();
  // if (!retornoValida) {
  //     this.router.navigate(['login']);
  //     return;
  // }
validaSessao(){
  let token = localStorage.getItem("token");
  if(token == null || token == '' || token == 'undefined'){
    return false;
  }
  return true;
}
}
