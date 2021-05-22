import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExpAddService } from '../../exp-add.service';

@Component({
  selector: 'app-view-year',
  templateUrl: './view-year.component.html',
  styleUrls: ['./view-year.component.css']
})
export class ViewYearComponent implements OnInit {

  public expenses;
  public selectedYearVal = formatDate(new Date(), 'yyyy', 'en-US').toString();

  constructor(private expAddService: ExpAddService) { }

  ngOnInit() {

    this.expAddService.selectedDate$
      .subscribe(
        dateVal => {
          if (this.selectedYearVal !== dateVal.toString().substr(0, 4)) {
            this.selectedYearVal = dateVal.toString().substr(0, 4);
            this.getExpenses(this.selectedYearVal);
          }
        })

    this.expAddService.refreshNeeded$
      .subscribe(() => {
        this.getExpenses(this.selectedYearVal);
      })

    this.getExpenses(this.selectedYearVal);
  }

  getExpenses(year) {
    this.expAddService.getExpenseYear(year).subscribe(
      response => this.expenses = response.data,
      error => console.error('Error!', error)
    );
  }

}
