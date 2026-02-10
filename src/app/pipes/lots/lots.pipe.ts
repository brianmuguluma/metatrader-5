import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lots',
  standalone: true,
})
export class LotsPipe implements PipeTransform {
  transform(units: any): any {
    return Math.abs(Number(units)) / 100;
  }
}
