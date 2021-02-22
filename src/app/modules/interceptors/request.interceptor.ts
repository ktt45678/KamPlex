import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      params: this.cleanParams(request.params),
      body: this.cleanBody(request.body)
    });
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
