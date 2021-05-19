import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExpAddService } from '../exp-add.service';

@Component({
  selector: 'app-view-month',
  templateUrl: './view-month.component.html',
  styleUrls: ['./view-month.component.css']
})
export class ViewMonthComponent implements OnInit {

  public expenses;
  public selectedMonthVal = formatDate(new Date(), 'yyyy-MM', 'en-US').toString();

  constructor(private expAddService: ExpAddService) { }

  ngOnInit() {

    this.expAddService.selectedDate$
      .subscribe(
        dateVal => {
          if (this.selectedMonthVal !== dateVal.toString().substr(0, 7)) {
            this.selectedMonthVal = dateVal.toString().substr(0, 7);
            this.getExpenses(this.selectedMonthVal);
          }
        })

    this.expAddService.refreshNeeded$
      .subscribe(() => {
        this.getExpenses(this.selectedMonthVal);
      })

    this.getExpenses(this.selectedMonthVal);
  }

  getExpenses(month) {
    console.log(month);
    this.expAddService.getExpenseMonth(month).subscribe(
      response => this.expenses = response.data,
      error => console.error('Error!', error)
    );
  }

}
