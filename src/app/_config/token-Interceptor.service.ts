import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CommomService } from "../services/commom.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private commomService: CommomService, private router: Router) { }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem("token");

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token),
            },
            );
            cloned.headers.set("Content-Type", "application/json");
            
            return next.handle(cloned).pipe(catchError(err => {
                if (err.status === 401 || err.status === 403 || err.status == 0) {
                    this.commomService.logout();
                    setTimeout(() => { alert("Sessão Expirada!") }, 200);
                }
                const error = err.error || err.statusText;
                return throwError(error);
            }));
        }
        else if (this.router.url != "/login" && this.router.url != "/cadastro") {
            this.commomService.logout();
            setTimeout(() => { alert("Sessão Expirada!") }, 100);
        }
        else {
            return next.handle(req);
        }
    }

}