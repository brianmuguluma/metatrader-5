import { Component, computed, inject, input } from '@angular/core';
import { IonLabel, IonItem } from '@ionic/angular/standalone';
import { Trade } from '../interfaces/oanda';
import { AppComponent } from '../app.component';
import { DatePipe, DecimalPipe, UpperCasePipe, NgClass } from '@angular/common';
import { SidePipe } from '../pipes/side/side-pipe';
import { OandaService } from '../services/oanda/oanda';
import { AbsolutePipe } from '../pipes/absolute/absolute-pipe';
import { ReplacePipe } from '../pipes/replace/replace.pipe';
import { CommaPipe } from '../pipes/comma/comma.pipe';

@Component({
  selector: 'app-trade-item',
  templateUrl: './trade-item.component.html',
  styleUrls: ['./trade-item.component.scss'],
  imports: [
    IonItem,
    IonLabel,
    DecimalPipe,
    SidePipe,
    AbsolutePipe,
    ReplacePipe,
    SidePipe,
    DatePipe,
    NgClass,
  ],
})
export class TradeItemComponent {
  app = inject(AppComponent);
  oanda = inject(OandaService);

  trade = input.required<Trade>();

  side = computed(() => Number(this.trade().initialUnits) > 0);
  isInProfit = computed(() => Number(this.trade()?.realizedPL) > 0);
}
