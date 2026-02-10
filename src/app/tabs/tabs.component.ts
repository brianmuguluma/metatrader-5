import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonLabel, IonIcon, IonTabs, IonTabBar, IonTabButton, RouterLink],
})
export class TabsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
