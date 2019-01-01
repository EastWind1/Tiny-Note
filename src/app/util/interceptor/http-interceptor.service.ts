import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userService.token ) {
       const authreq = req.clone({
        headers: req.headers.set('Authorization', this.userService.token)
      });
      return next.handle(authreq);
    }
    return next.handle(req);
  }
}

