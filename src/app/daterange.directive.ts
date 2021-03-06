import { Input, Output, EventEmitter, ViewChild, ElementRef, Directive, Renderer } from '@angular/core';
import {NgModel} from '@angular/forms';
declare var $ :any;

@Directive({
  selector: '[appDaterange]'
})
export class DaterangeDirective {
  @Output() ApplyDateChange = new EventEmitter();
  @Output() CancelDateChange = new EventEmitter();
  @Output() HideDateChange = new EventEmitter();
  element: any;
  constructor(public model: NgModel, private el: ElementRef, public renderer: Renderer) {
    this.element = el;
  }
  ngOnInit() {
      setTimeout(() => {
        $(this.element.nativeElement).daterangepicker({
              applyClass: 'btn-success',
              cancelClass: 'btn-danger',
              locale: {
                applyLabel: 'Вперед',
                cancelLabel: 'Отмена',
                startLabel: 'Начальная дата',
                endLabel: 'Конечная дата',
                customRangeLabel: 'Выбрать дату',
                daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт','Сб'],
                monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                firstDay: 1
            }
          }).on('apply.daterangepicker', (ev, picker) =>  {
              var startDate = picker.startDate;
              var endDate = picker.endDate;
              this.ApplyDateChange.next(startDate.format('MM/DD/YYYY') +' - '+ endDate.format('MM/DD/YYYY'));
          }).on('cancel.daterangepicker', (ev, picker) =>  {
              var startDate = picker.startDate;
              var endDate = picker.endDate;
              this.CancelDateChange.next(startDate.format('MM/DD/YYYY') +' - '+ endDate.format('MM/DD/YYYY'));
          }).on('hide.daterangepicker', (ev, picker) =>  {
              var startDate = picker.startDate;
              var endDate = picker.endDate;
              this.HideDateChange.next(startDate.format('MM/DD/YYYY') +' - '+ endDate.format('MM/DD/YYYY'));
          });
      }, 1000);
  }
}
