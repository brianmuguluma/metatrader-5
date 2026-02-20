import { Component, computed, inject } from '@angular/core';
import { IonContent, IonList } from '@ionic/angular/standalone';
import { TabsComponent } from '../tabs/tabs.component';
import { AppComponent } from '../app.component';
import { DecimalPipe } from '@angular/common';
import { ReplacePipe } from '../pipes/replace/replace.pipe';
import { AbsolutePipe } from '../pipes/absolute/absolute-pipe';
import { PositionItemComponent } from '../position-item/position-item.component';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.page.html',
  styleUrls: ['./trade.page.scss'],
  imports: [
    IonList,
    IonContent,
    TabsComponent,
    DecimalPipe,
    ReplacePipe,
    AbsolutePipe,
    PositionItemComponent,
  ],
})
export class TradePage {
  app = inject(AppComponent);

  marginLevel = computed(() => {
    if (!this.trades() || !this.app.poll()) return 0;

    const {
      state: { marginUsed, NAV },
    } = this.app.poll()!;
    return ((Number(NAV) - Number(marginUsed)) / Number(marginUsed)) * 100;
  });

  trades = computed(() => this.app.poll()?.state?.trades?.length);
}
