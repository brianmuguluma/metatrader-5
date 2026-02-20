import { Injectable } from '@angular/core';
import { Instrument } from 'src/app/interfaces/oanda';

@Injectable({
  providedIn: 'root',
})
export class PipsService {
  constructor() {}

  calculatePips(entry: number, exit: number, instrument: Instrument) {
    return (exit - entry) / this.getPipValue(instrument);
  }

  private getPipValue(instrument: Instrument): number {
    return 10 ** instrument.pipLocation;
  }
}
