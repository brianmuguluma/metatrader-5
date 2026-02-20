import { Component } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],

  imports: [
    // IonContent,
    // IonHeader,
    // IonTitle,
    // IonToolbar,

    TabsComponent,
  ],
})
export class SettingsPage {
  constructor() {
    setInterval(() => {
      // console.log(Date.now());
    }, 100);
  }
}
