import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTransform',
})
export class DateTransformPipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe
  ) {}

  transform(value: any, args?: any): any {
    if (value == 'The match is playing!') return value;
    return this.datePipe.transform(
        value, 'dd/M/y | HH:mm a'
      ) || '';
  }

}
