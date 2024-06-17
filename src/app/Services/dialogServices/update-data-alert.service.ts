import { Injectable } from '@angular/core';
import { AlertController, PickerController } from '@ionic/angular/standalone';
@Injectable({
  providedIn: 'root'
})
export class UpdateDataAlertService {

  constructor(private alert:AlertController,private picker: PickerController ) { }

  async updateData(message: string, value, type:string): Promise<any> {
    return new Promise(async (resolve) => {
      const inputs = this.getInputsByType(type, value);
      const alert = await this.alert.create({
        message: message,
        
        inputs: inputs,
        buttons: [
          {
            text: 'إلغاء',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'حفظ',
            handler: (data) => {
             
              resolve(data.value);      
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
  getInputsByType(type, value): any {
    switch (type) {
      case 'text':
        return [
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
        ];
      case 'number':
        return [
          {
            name: 'value',
            type: 'number',
            cssClass: 'warning',
            placeholder: 'ادخل البيانات',
            value: value,
            attributes: {
              autofocus: true,
            }
          },
        ];
        case 'select':
          if (value.DataSelect && Array.isArray(value.DataSelect)) {
            return value.DataSelect.map((item, index) => ({
              name: 'option' + index,
              type: 'radio',
              label: item.Name, 
              value: {value:{ Id: item.Id, Name: item.Name }},
              checked: item.Id === value.Id 
            }));
          }
          break;
      default:
        return []; // في حالة عدم تطابق أي نوع
    }
  }
  async AlertConfirm(message: string): Promise<boolean> {
    const alert = await this.alert.create({
      header: 'تنبيه',
      message: message,
      buttons: [
        {
          text: 'الغاء',
          role: 'cancel',
        },
        {
          text: 'تأكيد',
          role: 'confirm',
          handler: () => {
            return true;
          },
        },
      ],
    });
  
    await alert.present();
  
    const result = await alert.onDidDismiss();
    return result.role === 'confirm';
  }
  async createPickerDate(): Promise<any> {
    return new Promise(async (resolve) => {
      const picker = await this.picker.create({
        columns: [
          {
            name: 'day',
            options: this.generateNumberOptions(1, 31, 'اليوم'),
          },
          {
            name: 'month',
            options: this.generateNumberOptions(1, 12, 'الشهر'),
          },
          {
            name: 'year',
            options: this.generateNumberOptions(1, 10, 'السنة'),
          },
        ],
        buttons: [
          {
            text: 'اغلاق',
            role: 'cancel',
            handler: () => resolve(null),
          },
          {
            text: 'حفظ',
            handler: (data) => resolve(data),
          },
        ]
      });
  
      await picker.present();
    });
  }
  
  generateNumberOptions(start, end, text) {
    let options = [{ text: text, value: '0' }]; // إضافة القيمة صفر
    for (let i = start; i <= end; i++) {
      options.push({ text: i.toString(), value: i.toString() });
    }
    return options;
  }

}
