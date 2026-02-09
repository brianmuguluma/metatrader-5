import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentView,
  IonSegmentContent,
  IonList,
} from '@ionic/angular/standalone';
import { PositionsComponent } from '../positions/positions.component';
import { OrdersComponent } from '../orders/orders.component';
import { DealsComponent } from '../deals/deals.component';
import { AppComponent } from '../app.component';
import { DecimalPipe } from '@angular/common';
import { AbsolutePipe } from '../pipes/absolute/absolute-pipe';
import { CommaPipe } from '../pipes/comma/comma.pipe';
import { Trade } from '../interfaces/oanda';
import { OandaService } from '../services/oanda/oanda';
import { HttpParams } from '@capacitor/core';
import { TradeItemComponent } from '../trade-item/trade-item.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    // IonLabel,
    // IonSegmentButton,
    // IonSegment,
    IonContent,
    IonHeader,
    IonToolbar,
    // IonSegmentView,
    // IonSegmentContent,
    // PositionsComponent,
    // OrdersComponent,
    // DealsComponent,
    DecimalPipe,
    AbsolutePipe,
    CommaPipe,
    TradeItemComponent,
    IonList,
  ],
})
export class HistoryPage implements OnInit {
  app = inject(AppComponent);
  oanda = inject(OandaService);

  @ViewChild(IonContent) content!: IonContent;

  segments = signal([
    { value: 'positions', label: 'Positions' },
    { value: 'orders', label: 'Orders' },
    { value: 'deals', label: 'Deals' },
  ]);

  trades = signal<Trade[]>([]);

  async ngOnInit() {
    await this.getTrades();
    this.content?.scrollToBottom(0);
  }

  async getTrades() {
    const params: HttpParams = {
      state: 'CLOSED',
      count: '50',
    };

    // const params: HttpParams = {};

    const { data, status } = await this.oanda.getTrades(params);

    console.log(status, data);

    if (status !== 200) return;

    const trades: Trade[] = data.trades;
    this.trades?.set([...trades]);
  }
}
