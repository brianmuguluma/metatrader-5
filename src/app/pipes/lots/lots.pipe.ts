import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lots',
  standalone: true
})
export class LotsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
