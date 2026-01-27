import { Component, signal } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentView,
  IonSegmentContent,
} from '@ionic/angular/standalone';
import { PositionsComponent } from '../positions/positions.component';
import { OrdersComponent } from '../orders/orders.component';
import { DealsComponent } from '../deals/deals.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonSegmentButton,
    IonSegment,
    IonContent,
    IonHeader,
    IonToolbar,
    IonSegmentView,
    IonSegmentContent,
    PositionsComponent,
    OrdersComponent,
    DealsComponent,
  ],
})
export class HistoryPage {
  segments = signal([
    { value: 'positions', label: 'Positions' },
    { value: 'orders', label: 'Orders' },
    { value: 'deals', label: 'Deals' },
  ]);
}
