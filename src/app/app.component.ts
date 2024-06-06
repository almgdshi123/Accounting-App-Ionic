import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet,IonMenu, IonContent, IonLabel, IonButton, IonIcon, IonList, IonItem, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {  pieChartOutline,exitOutline,cloudDoneOutline ,archiveOutline } from 'ionicons/icons';
import {  RouterModule } from '@angular/router';
import { AuthenticationService } from './Services/account/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl:'app.component.scss',
  standalone: true,
  imports: [IonFooter, IonItem, IonList, IonIcon, IonButton, IonLabel, IonContent, IonApp, IonRouterOutlet,IonMenu,RouterModule],
})
export class AppComponent {
  userName=this.auth.username;
  constructor(private auth: AuthenticationService) {
    addIcons({
      pieChartOutline,
      cloudDoneOutline,
      archiveOutline,
      exitOutline
    });

    
  }
  
  logout(){
    this.auth.logout();

  }
  
}
