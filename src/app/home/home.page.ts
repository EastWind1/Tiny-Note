import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Platform } from '@ionic/angular';
import { NotifyService } from '../util/service/notify.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
/**
 * 主页
 */
export class HomePage {
  backButtonPressed = false;
  constructor(
    private appMinimize: AppMinimize,
    private platform: Platform,
    private notifyService: NotifyService,
    private route: ActivatedRoute
  ) {
    this.platform.backButton.subscribe(() => { // 监听回退按钮
      if (this.backButtonPressed && route.snapshot.url[0].path === 'home') {
        this.appMinimize.minimize();
        this.backButtonPressed = false;
      } else {
        this.notifyService.toast('再按一次退出程序');
        this.backButtonPressed = true;
        setTimeout(() => this.backButtonPressed = false, 2000);
      }
    });
  }
}
