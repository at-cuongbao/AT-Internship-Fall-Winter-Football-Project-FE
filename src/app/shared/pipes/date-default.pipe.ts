import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDefault'
})
export class DateDefaultPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
