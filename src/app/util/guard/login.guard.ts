import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { tap } from 'rxjs/operators';
import { NotifyService } from '../service/notify.service';

@Injectable()
export class LoginGuard implements CanLoad {
  constructor(
    private userService: UserService,
    private router: Router,
    private notifyService: NotifyService
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getLoginStatus().pipe(
      tap( result => {
        if (!result) {
          this.notifyService.toast('登录过期');
          this.userService.tempRoutePath = route.path;
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
