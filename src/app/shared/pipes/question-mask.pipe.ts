import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionMask'
})
export class QuestionMaskPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value || '?';
  }

}
