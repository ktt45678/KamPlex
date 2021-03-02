import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith(environment.apiUrl)) {
      const accessToken = this.authService.accessTokenValue;
      request = request.clone({
        params: this.cleanParams(request.params),
        body: this.cleanBody(request.body)
      });
      if (accessToken && !request.headers.get('Authorization')) {
        request = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
        });
      }
    }
    return next.handle(request);
  }

  private cleanParams(params: HttpParams): HttpParams | undefined {
    if (!params) {
      return undefined;
    }
    params.keys().forEach(key => {
      if (params.get(key) === undefined) {
        params = params.delete(key);
      }
    });
    return params;
  }

  private cleanBody(body: any): any {
    if (!body) {
      return undefined;
    }
    Object.keys(body).forEach(key => body[key] === undefined && delete body[key]);
    return body;
  }
}
