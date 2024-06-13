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
  IonAlert,
  IonGrid,
  IonCardSubtitle,
  IonToggle,
} from '@ionic/angular/standalone';
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
import { OperationsPage } from 'src/app/enum/ELookup';
import { Router, RouterModule } from '@angular/router';
import { ItemGroupModel } from 'src/app/Models/StoreModel';
import { DataService } from 'src/app/Services/dialogServices/data.service';
import { ProcesseProviderService } from 'src/app/Services/processe-provider.service';

@Component({
  selector: 'app-item-group',
  templateUrl: './item-group.page.html',
  standalone: true,
  imports: [
    IonToggle,
    IonCardSubtitle,
    IonGrid,
    IonAlert,
    IonSearchbar,
    IonImg,
    RouterModule,
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

  itemGroups: ItemGroupModel[];
  itemGroup: ItemGroupModel;
  ElookupItemGroup: { Name: string; Id: string }[] = [];
  data: any;
  isExpire: boolean = false;
  allowNeg: boolean = true;
  costLessSale: boolean = false;

  page = OperationsPage;

  constructor(
    private alertCrtl: AlertController,
    private router: Router,
    private dataService: DataService,
    private processe: ProcesseProviderService
  ) {
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
  }
  ionViewDidEnter() {
    this.getItemGroup();
  }


  getItemGroup() {
    this.processe.getListAsString('api/ItemGroupApi/GetAll').then((res) => {
      this.itemGroups = res;

    });

  }
  async openModal(item: ItemGroupModel) {
    this.itemGroup = item;

    this.modal.present();
  }

  SettingsSave() {
    this.alertCrtl
      .create({
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
            text: 'نعم',
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
    this.modal.dismiss();
  }
  openPage() {
    this.ElookupItemGroup = [];
    this.itemGroups.forEach((element) => {
      this.ElookupItemGroup.push({ Name: element.Name, Id: element.Id });
    });

    this.dataService.setData(this.ElookupItemGroup);

    this.router.navigate(['store/itemGroup/operationsPage']);
  }
}
