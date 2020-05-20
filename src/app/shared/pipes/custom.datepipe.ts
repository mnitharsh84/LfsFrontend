import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
name: 'customDatePipe'
})
export class CustomDatePipe extends
DatePipe implements PipeTransform {

  days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  transform(value: any, args?: any): any {
       return  this.days[value];
  }
}