import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(value: Array<any> | undefined, sep = ', '): string {
    if (!value) {
      return '';
    }
    return value.join(sep);
  }

}
