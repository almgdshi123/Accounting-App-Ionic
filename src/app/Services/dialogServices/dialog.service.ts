import { Injectable } from '@angular/core';
import { AlertController, LoadingController,MenuController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  loading: HTMLIonLoadingElement;

  constructor(private alertCtrl: AlertController, private loadingController: LoadingController,private menu: MenuController) {}

  async alertShowSuccess(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      cssClass: 'success-alert',
      buttons: ['تم'],
    });
    await alert.present();
  }

  async alertShowError(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      cssClass: 'error-alert',
      buttons: ['تم'],
    });
    await alert.present();
  }

  
  
  async showLoading(message: string = 'جاري التحميل...') {
    this.loading = await this.loadingController.create({
      message: message,
    });
    await this.loading.present();
  }


  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
  async enableMenu(bool: boolean) {
    await this.menu.enable(bool);
  }

    async closeMenu() {
      await this.menu.close();
    }
    
    
}
