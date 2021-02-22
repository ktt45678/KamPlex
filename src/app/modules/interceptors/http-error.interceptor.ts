import { Injectable, NgZone } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MessageService } from 'primeng/api';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService, private zone: NgZone) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status) {
        const summary = `${error.status} Error`;
        const detail = error.error.error || (error.error.errors ? error.error.errors[0].msg : 'Request failed');
        this.zone.run(() => this.messageService.add({ severity: 'error', summary, detail, life: 10000 }));
      }
      return throwError(error);
    }));
  }
}
