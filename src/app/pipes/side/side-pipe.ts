import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'side',
})
export class SidePipe implements PipeTransform {
  transform(units: string): string {
    return Number(units) > 0 ? 'buy' : 'sell';
  }
}
