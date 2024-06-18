import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonFab,
  IonFabButton,
  IonFabList,
  IonInput,

  IonList,
  IonItem,
  IonGrid, IonText, IonSearchbar, IonLabel, IonPopover } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  checkmark,
  close,
  eyeOutline,
  refreshOutline,
  settings,
  trash,
} from 'ionicons/icons';
import { NavService } from 'src/app/Services/dialogServices/nav.service';
import { DataService } from 'src/app/Services/dialogServices/data.service';
import { DialogService } from 'src/app/Services/dialogServices/dialog.service';

@Component({
  selector: 'app-operations-page',
  templateUrl: './operations-page.page.html',
  styleUrls: ['../../../../../style/operation-page.scss'],
  standalone: true,
  imports: [IonPopover, IonLabel, IonSearchbar,  IonText, 
    IonGrid,
    IonItem,
    IonInput,

    IonList,
    IonFabList,
    IonFabButton,
    IonFab,
    IonIcon,
    IonBackButton,
    IonButton,
    IonButtons,
    IonThumbnail,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    NgFor,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonSelectOption,
    IonSelect,
  ],
})
export class OperationsPagePage implements OnInit {
  ElookupItemGroup: { Name: string; Id: string }[] = [];
  ELookupUnitName: { Name: string }[] = [];
  ELookupUnitNameSearch: { Name: string }[] = [];

  searchTerm: string = '';
  isUnitNameOpen=false;
  itemFormGroup: FormGroup = new FormGroup({
    GroupId: new FormControl(null),
    Name: new FormControl('', Validators.required),
    EnName: new FormControl(''),
    DefaultUnitName: new FormControl(null, Validators.required),

  });

  constructor(
    public navService: NavService,
    private dataService: DataService,
    private dialog: DialogService
  ) {
    addIcons({
      checkmark,
      close,
      add,
      eyeOutline,
      settings,
      trash,
      refreshOutline,
    });
  }

  ngOnInit() {
    this.getElookup();
  }
  getElookup() {
    const data = this.dataService.getData();

    if (data) {
      this.ElookupItemGroup = data['ItemGroup'];
      this.ELookupUnitName = data['UnitName'];
    }
  }
  
  onSearchChange(event) {

    this.searchTerm = event.detail.value;
     this.filterData(this.searchTerm);
  }

  filterData(searchTerm) {
    if (searchTerm) {
      this.ELookupUnitNameSearch = this.ELookupUnitName.filter((s) =>
        s.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.ELookupUnitNameSearch = this.ELookupUnitName;
    }
   
  }
  save() {}

  clear() {
    this.dialog.AlertConfirm('هل تريد افرغ  جميع البيانات؟').then((res) => {
      if (res) {
        this.itemFormGroup.reset();
        this.itemFormGroup.patchValue({});
      }
    });
  }
  refresh() {
    this.dialog.AlertConfirm('هل تريد تحديث البيانات؟').then((res) => {
      if (res) {
        this.dataService.getElookupItem().finally(() => {
          this.getElookup();
        });
      }
    });
  }
  openPage(page: string) {
    switch (page) {
      case 'addItemGroup':
        this.dataService.getElookupItemGroup().finally(() => {
          this.navService.redirectTo('store/itemGroup/operationsPage');
        });
        break;
      case 'viewItemGroup':
        this.navService.redirectTo('store/itemGroup');
        break;
    }
  }
  setUnitName(Name){
    this.itemFormGroup.patchValue({DefaultUnitName:Name});
    this.isUnitNameOpen=false;
    
  }
  openUnitName(){
    this.isUnitNameOpen=true;
    this.ELookupUnitNameSearch=this.ELookupUnitName;
  }
 

}
