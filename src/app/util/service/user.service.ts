import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entity/user';
import { Log } from '../decorator/log.decorator';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUser = null;
  tempRoute = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notifyService: NotifyService
  ) { }

  @Log
  login(user: User): void {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    // 此处必须设置请求数据类型为x-www-form-urlencoded，并将数据转化为key=value形式，以模拟表单提交，
    // 可用new UrlSearchParams({xx: xx})，部分浏览器不支持
    this.http.post('/api/login', `username=${user.username}&password=${user.password}`, { headers: headers }).subscribe(
      result => {
        if (result['status']) {
          this.loginUser = user;
          this.notifyService.toast('登陆成功');
          if (this.tempRoute) {
            this.router.navigate([this.tempRoute]);
            this.tempRoute = null;
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.notifyService.toast('登录信息有误');
        }
      }
    );
  }

  @Log
  getLoginStatus(): Observable<boolean> {
    return this.http.get<boolean>('/api/user').pipe(
      catchError(() => {
        this.loginUser = null;
        return of(false);
      }
      )
    );
  }

  @Log
  signUp(user: User): void {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    this.http.post('/api/user', `username=${user.username}&password=${user.password}`, { headers: headers }).pipe(
      switchMap(result => of(true)),
      catchError(err => {
        this.notifyService.toast('用户已存在');
        return of(false);
      })
    ).subscribe( result => {
      if (result) {
        this.notifyService.confirm('注册成功，是否立即登陆', this, this.login, [user] );
      }
    });
  }
}
