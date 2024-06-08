import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  AlertController,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonThumbnail,
  IonText,
  IonLabel,
  IonCol,
  IonRow,
  IonModal,
  IonList,
  IonButton,
  IonListHeader,
  IonItem,
  IonChip,
  IonFabButton,
  IonFab,
  IonAvatar,
  IonImg,
  IonSearchbar,
  IonCheckbox, IonAlert, IonGrid } from '@ionic/angular/standalone';
import { ApiProviderService } from 'src/app/Services/api-provider.service';
import { addIcons } from 'ionicons';
import {
  add,
  document,
  createOutline,
  trashOutline,
  printOutline,
  informationCircleOutline,
  settings,
} from 'ionicons/icons';
import { DialogService } from 'src/app/Services/dialogServices/dialog.service';

@Component({
  selector: 'app-item-group',
  templateUrl: './item-group.page.html',
  styleUrls: ['./item-group.page.scss'],
  standalone: true,
  imports: [IonGrid, IonAlert, 
    IonCheckbox,
    IonSearchbar,
    IonImg,
    IonAvatar,
    IonModal,
    IonFab,
    IonFabButton,
    IonChip,
    IonItem,
    IonListHeader,
    IonButton,
    IonList,
    IonRow,
    IonCol,
    IonLabel,
    IonText,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonThumbnail,
    FormsModule,
  ],
})
export class ItemGroupPage implements OnInit {
  @ViewChild(IonModal, { static: true }) modal: IonModal;

  itemGroup: any;
  data: any;
  isExpire: boolean = false;
  allowNeg: boolean = true;
  costLessSale: boolean = false;

  constructor(private api: ApiProviderService, private dialog: DialogService, private  alertCrtl: AlertController) {
    addIcons({
      add: add,
      document: document,
      createOutline: createOutline,
      trashOutline: trashOutline,
      printOutline: printOutline,
      informationCircleOutline: informationCircleOutline,
      settings,
    });
  }

  ngOnInit() {
    this.getItemGroup();
  }


  getItemGroup() {
    this.dialog.showLoading();
    this.api
      .getData('api/ItemGroupApi/GetAll')
      .then((data) => {
        this.data = data;

        this.itemGroup = this.data.Data;

        this.dialog.hideLoading();
      })
      .catch(() => {
        this.dialog.alertShowError('خطأ', '  تاكد من اتصالك بالانترنت');
        this.dialog.hideLoading();
      });
  }
  async openModal(item: any) {
    // استبدل بمكون المودال الخاص بك

    this.isExpire = item?.IsExpire;
    this.allowNeg = item?.AllowNeg;
    this.costLessSale = item?.CostLessSale;
    this.modal.present();
  }

  SettingsSave() {
    this.alertCrtl.create({
      header: 'تنبيه',
      cssClass: 'error-alert',
      message: 'هل تريد تغيير الاعدادات؟',
      buttons: [
        {
          text: 'لا',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
        text: 'نعم',},
      ],
    }).then((alert) => {
      alert.present();
    });
    this.modal.dismiss(
    )
    
    
  }
}
