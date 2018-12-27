import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoginGuard implements CanLoad {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getLoginStatus().pipe(
      tap( result => {
        if (!result) {
          this.userService.tempRoute = route.path;
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
