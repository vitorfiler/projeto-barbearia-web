import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CommomService } from "../services/commom.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private commomService: CommomService) { }

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
                if (err.status === 401 || err.status === 403) {
                    this.commomService.logout();
                    setTimeout(() => {alert("Sessão Expirada!")}, 200);
                }
                const error = err.error.message || err.statusText;
                    return throwError(error);
            }));
        }
        else {
            return next.handle(req);
        }
    }

}