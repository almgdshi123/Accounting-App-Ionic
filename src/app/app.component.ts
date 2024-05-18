import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet,IonMenu, IonContent, IonLabel, IonButton, IonIcon, IonList, IonItem, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudDoneOutline ,pieChartOutline ,newspaperOutline,browsersOutline,serverOutline,constructOutline,exitOutline, newspaper} from 'ionicons/icons';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl:'app.component.scss',
  standalone: true,
  imports: [IonFooter, IonItem, IonList, IonIcon, IonButton, IonLabel, IonContent, IonApp, IonRouterOutlet,IonMenu,RouterModule],
})
export class AppComponent {
  constructor() {
    addIcons({
      cloudDoneOutline,
      pieChartOutline,
      newspaperOutline,
      browsersOutline,
      serverOutline,
      constructOutline,
      exitOutline
    });
  }
}
