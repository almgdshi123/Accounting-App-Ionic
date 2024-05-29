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
  MenuController,
  IonInput,
  IonFooter,
  IonToolbar,
  IonIcon,
} from '@ionic/angular/standalone';
import { AuthenticationService } from 'src/app/Services/account/authentication.service';
import { DialogService } from 'src/app/Services/dialogServices/dialog.service';

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
    private auth: AuthenticationService,
    private menu: MenuController,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.menu.enable(false);
    if (this.auth.isAuthenticated()) {
      this.auth.redirectTo('/home');
      this.menu.enable(true);
      this.dialog.alertShowSuccess('مرحبا', 'تم تسجيل الدخول بنجاح');
    }

  }

  login() {
    if (this.loginFormGroup.valid) {
      const data = {
        username: this.loginFormGroup.value.UName,
        password: this.loginFormGroup.value.UPsd,
      };
      this.dialog.showLoading('جاري تسجيل الدخول...');

      this.auth.userLogin(data).then(() => {
        if(this.auth.isAuthenticated()){
          this.auth.redirectTo('/home');
          this.menu.enable(true);
          this.dialog.hideLoading();
          this.dialog.alertShowSuccess('مرحبا', 'تم تسجيل الدخول بنجاح');
        }else{
          this.dialog.hideLoading();
          this.dialog.alertShowError('خطاء', 'خطأ في اسم المستخدم او كلمة المرور');
        }
      });
    } else {
      this.loginFormGroup.markAllAsTouched();
    }
  }
}
