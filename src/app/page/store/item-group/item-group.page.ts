import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
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
  IonToggle,
} from '@ionic/angular/standalone';
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
import { OperationsPage } from 'src/app/enum/ELookup';
import { Router, RouterModule } from '@angular/router';
import { ItemGroupModel } from 'src/app/Models/StoreModel';
import { DataService } from 'src/app/Services/dialogServices/data.service';
import { ProcesseProviderService } from 'src/app/Services/processe-provider.service';
import { UpdateDataAlertService } from 'src/app/Services/dialogServices/update-data-alert.service';
import { Tarmeez } from '../../../../app/enum/ELookup';
@Component({
  selector: 'app-item-group',
  templateUrl: './item-group.page.html',
  standalone: true,
  imports: [
    IonToggle,
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
  ElookupCurrency: { Name: string; Id: string }[] = [];
  ElookupTarmeez: { Name: string; ItemNo: number }[] = [];

  data: any;
  isExpire: boolean = false;
  allowNeg: boolean = true;
  costLessSale: boolean = false;

  page = OperationsPage;

  constructor(
    private updateDataAlert: UpdateDataAlertService,
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

  ngOnInit() {}
  ionViewDidEnter() {
    this.getItemGroup();
  }

   async getItemGroup() {
    const res = await this.processe.getListAsString('api/ItemGroupApi/GetAll');
    this.itemGroups = res;
    this.getElookup();
  }
  async getElookup() {
    this.ElookupItemGroup = [];

    if (this.itemGroups) {
      this.ElookupItemGroup = this.itemGroups.map((element) => ({
        Name: element.Name,
        Id: element.Id,
      }));

      if (this.ElookupCurrency.length === 0) {
        const currencyData = await this.processe.getListAsString(
          'api/CurrencyApi/GetAll'
        );
        this.ElookupCurrency = currencyData.map((item) => ({
          Name: item.Name,
          Id: item.Id,
        }));
      }

      if (this.ElookupTarmeez.length === 0) {
        const tarmeezData = await this.processe.getByRequireList(
          'api/TarmeezApi/GetTarmeezByGroupAndRequireList',
          Tarmeez
        );
        this.ElookupTarmeez = tarmeezData.map((item) => ({
          Name: item.Name,
          ItemNo: item.ItemNo,
        }));
      }
    }
  }
  async openModal(item: ItemGroupModel) {
    this.itemGroup = item;
    this.itemGroup.OldId = this.itemGroup.Id;

    this.modal.present();
  }
  async UpdateData(title) {
    let res = '';
    switch (title) {
      case 'Name':
        this.updateDataAlert
          .updateData('    تعديل اسم المجموعة', this.itemGroup.Name)
          .then((res) => {
            if (res) this.itemGroup.Name = res;
          });
        break;

      case 'Sort':
        this.updateDataAlert
          .updateData('    تعديل ترتيب المجموعة', this.itemGroup.Sort)
          .then((res) => {
            if (res) this.itemGroup.Sort = res;
          });
        break;
    }
  }

  SettingsSave() {
    this.updateDataAlert.settingsSave().then((res) => {
      if (res)
        this.processe
          .edit('api/ItemGroupApi/Update', this.itemGroup, 'تم التعديل بنجاح')
          .then((res) => {
            if (res) this.getItemGroup();
          });
    });

    this.modal.dismiss();
  }
  openPage() {
    this.dataService.setData({
      ItemGroup: this.ElookupItemGroup,
      Currency: this.ElookupCurrency,
      Tarmeez: this.ElookupTarmeez,
    });

    this.router.navigate(['store/itemGroup/operationsPage']);
  }
}
