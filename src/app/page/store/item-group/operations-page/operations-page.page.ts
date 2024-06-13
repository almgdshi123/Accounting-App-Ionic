import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { addIcons } from 'ionicons';
import { checkmark } from 'ionicons/icons';
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
  
  IonToggle, IonText } from '@ionic/angular/standalone';
import { ItemGroupModel } from 'src/app/Models/StoreModel';
import { DataService } from 'src/app/Services/dialogServices/data.service';
import { DialogService } from 'src/app/Services/dialogServices/dialog.service';
import { ProcesseProviderService } from 'src/app/Services/processe-provider.service';
import { NavService } from 'src/app/Services/dialogServices/nav.service';

@Component({
  selector: 'app-operations-page',
  templateUrl: './operations-page.page.html',
  styleUrls: ['./operations-page.page.scss'],
  standalone: true,
  imports: [IonText, 
    IonToggle,
    IonPickerLegacy,
    IonAlert,
    IonGrid,

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
    ReactiveFormsModule
  ],
})
export class OperationsPagePage implements OnInit {
  itemGroup: ItemGroupModel ;
  itemGroupFormGroup: FormGroup  = new FormGroup( {
    Name: new FormControl('', Validators.required),
  });

  ElookupItemGroup: { Name: string; Id: string }[] = [];
  data: any;

  constructor(private dataService: DataService ,private processe: ProcesseProviderService,public navService:NavService) {

    addIcons({
      checkmark,
    });
  }

  ngOnInit() {
    const data = this.dataService.getData();

    if (data) {
      this.ElookupItemGroup = data;
    }
  }
  async save() {
    if (this.itemGroupFormGroup.valid) {
      this.itemGroup = this.itemGroupFormGroup.value;
   await this.processe.add('api/ItemGroupApi/Add',this.itemGroup,'تم الحفظ بنجاح').finally(() => {
     this.navService.redirectTo('/store/itemGroup');
   });

  }}

  public alertButtons = [
    {
      text: 'الغاء',
      role: 'cancel',
    },
    {
      text: 'تأكيد',
      role: 'confirm',
      handler: () => {},
    },
  ];
  public durationPickerColumns = [
    {
      name: 'days',
      options: this.generateNumberOptions(1, 30, 'يوم'),
    },
    {
      name: 'months',
      options: this.generateNumberOptions(1, 12, 'شهر'),
    },
    {
      name: 'years',
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
        console.log(
          `لقد اخترت مدة: ${value.days.text} يوم/أيام, ${value.months.text} شهر/شهور, ${value.years.text} سنة/سنوات`
        );
      },
    },
  ];

  // تأكد من تحديث الدالة generateNumberOptions لتشمل الصفر إذا لم تكن قد فعلت ذلك بالفعل
  generateNumberOptions(start, end, text) {
    let options = [{ text: text, value: '0' }]; // إضافة القيمة صفر
    for (let i = start; i <= end; i++) {
      options.push({ text: i.toString(), value: i.toString() });
    }
    return options;
  }

  // دالة مساعدة لتوليد خيارات الأرقام ضمن نطاق
}
