import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';

const TOKENFORAPI =
  '2b28e8b00cf43f30aea18607ed1e848b0f472e46aa71e53fb4b6f58a0ad1ecd8';

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = req.headers.set('Authorization', TOKENFORAPI);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${TOKENFORAPI}`),
  });
  return next(authReq);
}
