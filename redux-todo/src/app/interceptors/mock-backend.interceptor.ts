import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class MockBackendInterceptor implements HttpInterceptor {

    private currentTaskId = 0;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url === '/tasks') {

            this.currentTaskId++;

            // return throwError(new HttpErrorResponse({status: 500}));

            return of(new HttpResponse({ status: 200, body: this.currentTaskId })).pipe(delay(600));
        }

        return of(new HttpResponse({ status: 200 })).pipe(delay(600));
    }

}
