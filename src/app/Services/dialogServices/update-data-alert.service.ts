import { Injectable, input } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';
@Injectable({
  providedIn: 'root'
})
export class UpdateDataAlertService {

  constructor(private alert:AlertController) { }

  async updateData(message: string, value): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alert.create({
        message: message,
        inputs: [
          {
            name: 'value',
            type: 'text',
            cssClass: 'warning',
            placeholder: 'ادخل البيانات',
            value: value,
            attributes: {
              autofocus: true,
            }
          },
        ],
        buttons: [
          {
            text: 'إلغاء',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'حفظ',
            handler: (data) => {
              resolve(data.value); // هنا نستخدم resolve لإرجاع القيمة
            }
          }
        ]
      });
      await alert.present();
    });
  }
  
  async settingsSave(): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alert
      .create({
        header: 'تنبيه',
        cssClass: 'error-alert',
        message: 'هل تريد تغيير الاعدادات؟',
        buttons: [
          {
            text: 'لا',
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: 'نعم',
            role: 'confirm',
            handler: () => {
              resolve(true);
            },
          },
        ],
      });
      await alert.present();
    })
 
  }

}
