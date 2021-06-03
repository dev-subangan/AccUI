import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
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

  @Input() viewType: string;
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
    private readonly expAddService: ExpAddService,
    private readonly accUtill: AccUtillService,
    private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.loadInitialData();

    this.expAddService.selectedDate$
      .subscribe(
        dateVal => {
          if (this.viewType === 'exp-day') {
            this.selectedDateVal = dateVal.toString();
            this.getExpenses(this.selectedDateVal);
          } else if (this.viewType === 'exp-month' && this.selectedMonthVal !== dateVal.toString().substr(0, 7)) {
            this.selectedMonthVal = dateVal.toString().substr(0, 7);
            this.getExpenses(this.selectedMonthVal);
          } else if (this.viewType === 'exp-year' && this.selectedYearVal !== dateVal.toString().substr(0, 4)) {
            this.selectedYearVal = dateVal.toString().substr(0, 4);
            this.getExpenses(this.selectedYearVal);
          }
        })

    this.expAddService.refreshNeeded$
      .subscribe(() => {
        if (this.viewType === 'exp-day') {
          this.getExpenses(this.selectedDateVal);
        } else if (this.viewType === 'exp-month') {
          this.getExpenses(this.selectedMonthVal);
        } else if (this.viewType === 'exp-year') {
          this.getExpenses(this.selectedYearVal);
        } else if (this.viewType === 'exp-all') {
          this.getExpenses();
        }
      })

  }

  private loadInitialData() {
    switch (this.viewType) {
      case 'exp-day':
        this.classExpression = 'dayTable';
        this.isDayView = true;
        this.getExpenses(this.selectedDateVal);
        break;
      case 'exp-month':
        this.classExpression = 'monthTable';
        this.isMonthView = true;
        this.viewTypeName = 'Day';
        this.getExpenses(this.selectedMonthVal);
        break;
      case 'exp-year':
        this.classExpression = 'yearTable';
        this.isYearView = true;
        this.viewTypeName = 'Month';
        this.getExpenses(this.selectedYearVal);
        break;
      case 'exp-all':
        this.classExpression = 'allTable';
        this.isAllView = true;
        this.viewTypeName = 'Year';
        this.getExpenses();
        break;
      default: break;
    }
  }

  getExpenses(date?: string) {
    this.getExpensesMethod()(date).pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        this.expenses = response.data
        this.changeDetectorRef.markForCheck();
      },
      error => console.error('Error!', error)
    );
  }

  private getExpensesMethod = () => (s: string) => {
    switch (this.viewType) {
      case 'exp-day':
        return this.expAddService.getExpense(s);
      case 'exp-month':
        return this.expAddService.getExpenseMonth(s);
      case 'exp-year':
        return this.expAddService.getExpenseYear(s);
      case 'exp-all':
        return this.expAddService.getExpenseAll();
    }
  }

  delete(id: number) {
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
