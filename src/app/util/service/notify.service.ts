import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable()
export class NotifyService {
  constructor(
    private toastCOntroller: ToastController,
    private alertController: AlertController
  ) { }

  async toast(message: string) {
    const toast = await this.toastCOntroller.create({
      message: message,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  async confirm(message: string, context: any, successCallback: Function, args?: any[]) { // 调用类方法的回调，必须获取方法所在上下文，否则使用this会导致undefined
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => successCallback.apply(context, args)
        }
      ]
    });
    alert.present();
  }
}
