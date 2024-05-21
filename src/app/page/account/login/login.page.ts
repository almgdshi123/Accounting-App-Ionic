import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
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
  IonAvatar,
  IonItem,
  IonButton,
  IonInput,
  IonFooter,
  IonToolbar,
  IonIcon,
} from '@ionic/angular/standalone';
import { ApiProviderService } from 'src/app/Services/api-provider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonToolbar,
    NgIf,
    IonFooter,
    IonInput,
    ReactiveFormsModule,
    IonButton,
    IonItem,
    IonAvatar,
    IonHeader,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class LoginPage implements OnInit {
  loginFormGroup: FormGroup = new FormGroup({
    UName: new FormControl('', [Validators.required]),
    UPsd: new FormControl('', [Validators.required]),
    BranchId: new FormControl('', [Validators.required]),
  });

 

  constructor(
    private api: ApiProviderService,
  ) {}

  ngOnInit() {}

  login() {
    if (this.loginFormGroup.valid) {
     
       this.api.postData(  this.loginFormGroup.value, 'LoginApi/Authenticate').then((res: any) => {
        
       });

    
    
    } else {
      this.loginFormGroup.markAllAsTouched();
    }
  }
}
