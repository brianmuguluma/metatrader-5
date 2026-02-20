import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { IonContent, IonList } from '@ionic/angular/standalone';
import { AppComponent } from '../app.component';
import { DecimalPipe } from '@angular/common';
import { AbsolutePipe } from '../pipes/absolute/absolute-pipe';
import { Trade } from '../interfaces/oanda';
import { OandaService } from '../services/oanda/oanda';
import { HttpParams } from '@capacitor/core';
import { TradeItemComponent } from '../trade-item/trade-item.component';
import { ReplacePipe } from '../pipes/replace/replace.pipe';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],

  imports: [
    IonContent,
    DecimalPipe,
    AbsolutePipe,
    TradeItemComponent,
    IonList,
    ReplacePipe,
    TabsComponent,
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
    // setTimeout(() => {
    //   this.content?.scrollToBottom(0);
    // }, 3000);
  }

  async getTrades() {
    const params: HttpParams = {
      state: 'CLOSED',
      count: '10',
    };

    // const params: HttpParams = {};

    const { data, status } = await this.oanda.getTrades(params);

    console.log(status, data);

    if (status !== 200) return;

    const trades: Trade[] = data.trades.reverse();
    this.trades?.set([...trades]);
  }
}
