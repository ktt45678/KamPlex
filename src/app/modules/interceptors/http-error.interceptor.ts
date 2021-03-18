import { Injectable, NgZone } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private zone: NgZone, private router: Router, private messageService: MessageService, private authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status) {
        const severity = 'error';
        const summary = `${error.status} Error`;
        const detail = error.error.error || (error.error.errors ? error.error.errors[0].msg : 'Request failed');
        const life = 10000;
        switch (error.status) {
          case 401:
            this.authService.logout();
            location.reload();
            break;
          case 404:
            this.router.navigate(['/']);
            this.zone.run(() => this.messageService.add({ severity, summary, detail, life }));
            break;
          default:
            this.zone.run(() => this.messageService.add({ severity, summary, detail, life }));
            break;
        }
      }
      return throwError(error);
    }));
  }
}
