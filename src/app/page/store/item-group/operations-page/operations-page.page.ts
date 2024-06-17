import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { addIcons } from 'ionicons';
import { checkmark, close } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonSelect,
  IonSelectOption,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonLabel,
  IonItem,
  IonList,
  IonIcon,
  IonAvatar,
  IonInput,
  IonButtons,
  IonButton,
  IonChip,
  IonCardSubtitle,
  IonCol,
  IonRow,
  IonGrid,
  IonAlert,
  IonPickerLegacy,
  IonToggle,
  IonText,
} from '@ionic/angular/standalone';
import { ItemGroupModel } from 'src/app/Models/StoreModel';
import { DataService } from 'src/app/Services/dialogServices/data.service';
import { ProcesseProviderService } from 'src/app/Services/processe-provider.service';
import { NavService } from 'src/app/Services/dialogServices/nav.service';

@Component({
  selector: 'app-operations-page',
  templateUrl: './operations-page.page.html',
  styleUrls: ['./operations-page.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonToggle,
    IonPickerLegacy,
    IonAlert,
    IonGrid,
    NgIf,
    IonRow,
    IonCol,
    IonCardSubtitle,
    IonChip,
    IonButton,
    IonButtons,
    IonInput,
    IonAvatar,
    NgFor,
    IonSelectOption,
    IonSelect,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonBackButton,
    IonContent,
    IonThumbnail,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OperationsPagePage implements OnInit {
  itemGroup: ItemGroupModel;

  itemGroupFormGroup: FormGroup = new FormGroup({
    Name: new FormControl('', Validators.required),
    Sort: new FormControl(''),
     ParentId: new FormControl(null),
    StoreCurrencyId: new FormControl(1, Validators.required),
    CostLessSale: new FormControl(false),
    AllowNeg: new FormControl(false),
    AllowNegForAllItemGroup: new FormControl(false),
    IsExpire: new FormControl(false),
    IsNotifyExp: new FormControl(false),
    ExpDay: new FormControl(0),
    ExpMonth: new FormControl(0),
    ExpYear: new FormControl(0),
    AvgCostAtCurrentVal: new FormControl(false),
    IsScale: new FormControl(false),
  });

  ElookupItemGroup: { Name: string; Id: string }[] = [];
  ElookupCurrency: { Name: string; Id: string }[] = [];

  ElookupTarmeez: { Name: string; ItemNo: number }[] = [];

  data: any;
  isAlertOpen = false;
  IsExpirePickerOpen = false;

  constructor(
    private dataService: DataService,
    private processe: ProcesseProviderService,
    public navService: NavService
  ) {
    addIcons({
      checkmark,
      close,
    });
  }

  ngOnInit() {
    const data = this.dataService.getData();

    if (data) {
      this.ElookupItemGroup = data['ItemGroup'];
      this.ElookupCurrency = data['Currency'];
      this.ElookupTarmeez = data['Tarmeez'];
    }
  }
  async save() {
    if (this.itemGroupFormGroup.valid) {
      this.itemGroup = this.itemGroupFormGroup.value;
      console.log(this.itemGroup);
      await this.processe
        .add('api/ItemGroupApi/Add', this.itemGroup, 'تم الحفظ بنجاح')
        .finally(() => {
          this.navService.redirectTo('/store/itemGroup');
        });
    }
  }

  public alertButtons = [
    {
      text: 'الغاء',
      role: 'cancel',
    },
    {
      text: 'تأكيد',
      role: 'confirm',
      handler: () => {
        this.toggleAllowNegForAllItemGroup();
      },
    },
  ];
  public durationPickerColumns = [
    {
      name: 'ExpDay',
      options: this.generateNumberOptions(1, 30, 'يوم'),
    },
    {
      name: 'ExpMonth',
      options: this.generateNumberOptions(1, 12, 'شهر'),
    },
    {
      name: 'ExpYear',
      options: this.generateNumberOptions(1, 10, 'سنة'),
    },
  ];
  public durationPickerButtons = [
    {
      text: 'إلغاء',
      role: 'cancel',
    },
    {
      text: 'تأكيد',
      handler: (value) => {
        this.itemGroupFormGroup.patchValue({
          IsNotifyExp: true,
          ExpDay: value.ExpDay.value,
          ExpMonth: value.ExpMonth.value,
          ExpYear: value.ExpYear.value,
        });
      },
    },
  ];

  generateNumberOptions(start, end, text) {
    let options = [{ text: text, value: '0' }]; // إضافة القيمة صفر
    for (let i = start; i <= end; i++) {
      options.push({ text: i.toString(), value: i.toString() });
    }
    return options;
  }
  toggleAllowNegForAllItemGroup() {
    const currentValue = this.itemGroupFormGroup.value.AllowNegForAllItemGroup;
    this.itemGroupFormGroup.patchValue({
      AllowNegForAllItemGroup: !currentValue,
    });
  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  setOpenExpire(isOpen: boolean) {
    this.IsExpirePickerOpen = isOpen;
  }
}
