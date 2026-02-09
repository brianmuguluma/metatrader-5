import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comma',
})
export class CommaPipe implements PipeTransform {
  transform(
    value: string | number | undefined | null
  ): string | number | undefined | null {
    return value ? value.toString().split(',').join(' ') : value;
  }
}
