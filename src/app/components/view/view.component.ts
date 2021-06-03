import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ExpAddService } from 'src/app/services/exp-add.service';
import { AccUtillService } from 'src/app/services/acc-utill.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//https://namitamalik.github.io/Realtime-Update-in-Angular2/
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  @Input() viewType: string = '';
  isDayView: boolean = false;
  isMonthView: boolean = false;
  isYearView: boolean = false;
  isAllView: boolean = false;
  viewTypeName: string;

  classExpression: string;

  public expenses;
  public selectedDateVal = formatDate(new Date(), 'yyyy-MM-dd', 'en-US').toString();
  public selectedMonthVal = formatDate(new Date(), 'yyyy-MM', 'en-US').toString();
  public selectedYearVal = formatDate(new Date(), 'yyyy', 'en-US').toString();

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private expAddService: ExpAddService,
    private readonly accUtill: AccUtillService) { }

  ngOnInit() {

    if (this.viewType === 'exp-day') {
      this.classExpression = 'dayTable';
      this.isDayView = true;
    } else if (this.viewType === 'exp-month') {
      this.classExpression = 'monthTable';
      this.isMonthView = true;
      this.viewTypeName = 'Day';
    } else if (this.viewType === 'exp-year') {
      this.classExpression = 'yearTable';
      this.isYearView = true;
      this.viewTypeName = 'Month';
    } else if (this.viewType === 'exp-all') {
      this.classExpression = 'allTable';
      this.isAllView = true;
      this.viewTypeName = 'Year';
    }

    this.expAddService.selectedDate$
      .subscribe(
        dateVal => {
          if (this.viewType === 'exp-day') {
            this.selectedDateVal = dateVal.toString();
            this.getDayExpenses(this.selectedDateVal);
          } else if (this.viewType === 'exp-month' && this.selectedMonthVal !== dateVal.toString().substr(0, 7)) {
            this.selectedMonthVal = dateVal.toString().substr(0, 7);
            this.getMonthExpenses(this.selectedMonthVal);
          } else if (this.viewType === 'exp-year' && this.selectedYearVal !== dateVal.toString().substr(0, 4)) {
            this.selectedYearVal = dateVal.toString().substr(0, 4);
            this.getYearExpenses(this.selectedYearVal);
          }
        })

    this.expAddService.refreshNeeded$
      .subscribe(() => {
        if (this.viewType === 'exp-day') {
          this.getDayExpenses(this.selectedDateVal);
        } else if (this.viewType === 'exp-month') {
          this.getMonthExpenses(this.selectedMonthVal);
        } else if (this.viewType === 'exp-year') {
          this.getYearExpenses(this.selectedYearVal);
        } else if (this.viewType === 'exp-all') {
          this.getAllExpenses();
        }
      })

    if (this.viewType === 'exp-day') {
      this.getDayExpenses(this.selectedDateVal);
    } else if (this.viewType === 'exp-month') {
      this.getMonthExpenses(this.selectedMonthVal);
    } else if (this.viewType === 'exp-year') {
      this.getYearExpenses(this.selectedYearVal);
    } else if (this.viewType === 'exp-all') {
      this.getAllExpenses();
    }

  }

  getDayExpenses(date) {
    this.expAddService.getExpense(date).pipe(takeUntil(this.destroy$)).subscribe(
      response => this.expenses = response.data,
      error => console.error('Error!', error)
    );
  }

  getMonthExpenses(month) {
    this.expAddService.getExpenseMonth(month).subscribe(
      response => this.expenses = response.data,
      error => console.error('Error!', error)
    );
  }

  getYearExpenses(year) {
    this.expAddService.getExpenseYear(year).subscribe(
      response => this.expenses = response.data,
      error => console.error('Error!', error)
    );
  }

  getAllExpenses() {
    this.expAddService.getExpenseAll().subscribe(
      response => this.expenses = response.data,
      error => console.error('Error!', error)
    );
  }

  delete(id) {
    this.expAddService.deleteExpense(id).subscribe(
      response => this.accUtill.showNotification("Expenditure deleted"),
      error => console.error('Error!', error)
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}


