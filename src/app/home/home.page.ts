import { Component } from '@angular/core';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Platform } from '@ionic/angular';
import { NotifyService } from '../util/service/notify.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  backButtonPressed = false;
  constructor(
    private appMinimize: AppMinimize,
    private platform: Platform,
    private notifyService: NotifyService
  ) {
    this.platform.backButton.subscribe(() => {
      if (this.backButtonPressed) {
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
