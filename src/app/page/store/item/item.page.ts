import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonThumbnail,
  IonItem,
  IonLabel,
  IonRow,
  IonGrid,
  IonCol,
  IonChip,
  IonButton,
  IonIcon,
  IonListHeader,
  IonToggle,
  IonList,
  IonModal, IonFabButton, IonFab } from '@ionic/angular/standalone';
import { ProcesseProviderService } from 'src/app/Services/processe-provider.service';
import { ItemModel } from 'src/app/Models/StoreModel';
import { addIcons } from 'ionicons';
import {
  add,
  document,
  createOutline,
  trashOutline,
  printOutline,
  informationCircleOutline,
  settings,
  eyeOutline,
  barcodeOutline,
} from 'ionicons/icons';
import { DataService } from 'src/app/Services/dialogServices/data.service';
import { NavService } from 'src/app/Services/dialogServices/nav.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  standalone: true,
  imports: [IonFab, IonFabButton, 
    IonModal,
    IonList,
    IonToggle,
    IonListHeader,
    IonIcon,
    IonButton,
    IonChip,
    IonCol,
    IonGrid,
    IonRow,
    IonLabel,
    IonItem,
    IonBackButton,
    IonButtons,
    IonThumbnail,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ItemPage implements OnInit {
  @ViewChild(IonModal, { static: true }) modal: IonModal;

  itemData: ItemModel[] = [];
  items: ItemModel;
  isModalOpenSettings = false;

  isModalOpenView = false;

  constructor(private processe: ProcesseProviderService,private dataService: DataService,private nav: NavService) {
    addIcons({
      add,
      document,
      createOutline,
      trashOutline,
      printOutline,
      informationCircleOutline,
      settings,
      eyeOutline,
      barcodeOutline,
    });
  }

  ngOnInit() {}
  ionViewDidEnter() {
    this.getItem();
  }
   openModal(type, item?) {
     this.modal.dismiss();
    this.isModalOpenView = false;
    this.isModalOpenSettings = false;

    if (type === 'View') {
      this.items = item;
      this.isModalOpenView = true;
       this.modal.present();
    }
    if (type === 'Settings') {
      this.isModalOpenSettings = true;
    }
  }
  
  async getItem() {
    const res = await this.processe.getListAsString('api/ItemApi/GetAll');
    this.itemData = res;
  }
  openPage() {
    this.dataService.getElookupItem().finally(() => {
      this.nav.redirectTo('store/item/operationsPage');
    });
  }
}
