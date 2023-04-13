import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authService = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'bearer ' + authService.getToken()
      ),
    });
    return next.handle(tokenizedReq);
  }
}
