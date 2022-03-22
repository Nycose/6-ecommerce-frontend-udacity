import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber'
})
export class CardNumberPipe implements PipeTransform {

  transform(cardNumber: string, ...args: unknown[]): string {
    if(cardNumber === null) {
      return '';
    }
    const cardNumberArr = cardNumber.split('');
    const lastIndex = cardNumberArr.length;
    const startIndex = lastIndex - 4;
    const lastFour = cardNumberArr.slice(startIndex, lastIndex).join('');
    return lastFour;
  }

}
