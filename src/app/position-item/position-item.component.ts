import { Component, inject, input, signal } from '@angular/core';
import { CalculatedTradeState, Trade } from '../interfaces/oanda';
import { IonItem, IonLabel, IonAlert } from '@ionic/angular/standalone';
import { ReplacePipe } from '../pipes/replace/replace.pipe';
import { DecimalPipe, LowerCasePipe, NgClass } from '@angular/common';
import { AppComponent } from '../app.component';
import { AbsolutePipe } from '../pipes/absolute/absolute-pipe';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-position-item',
  templateUrl: './position-item.component.html',
  styleUrls: ['./position-item.component.scss'],
  imports: [
    IonAlert,
    IonLabel,
    IonItem,
    ReplacePipe,
    NgClass,
    DecimalPipe,
    AbsolutePipe,
    LowerCasePipe,
  ],
})
export class PositionItemComponent {
  app = inject(AppComponent);
  trade = input.required<any>();

  entry = signal(0);
  side = signal('');
  lots = signal(0);
  multiplier = signal(0);

  inputs = signal([
    {
      type: 'number',
      placeholder: 'Entry price',
    },
    {
      type: 'text',
      placeholder: 'Side',
    },
    {
      type: 'number',
      placeholder: 'Lots',
    },
    {
      type: 'number',
      placeholder: 'Multiplier',
    },
  ]);

  buttons = signal([
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'OK',
      role: 'confirm',
    },
  ]);

  setResult(event: CustomEvent<OverlayEventDetail>) {
    const {
      detail: {
        data: { values },
      },
    } = event;

    this.entry.set(values['0']);
    this.side.set(values['1']);
    this.lots.set(values['2']);
    this.multiplier.set(values['3']);
  }
}
