import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  transform(string: any, seperator: any, joiner: string): any {
    return string ? string.split(seperator).join(joiner) : string;
  }
}
