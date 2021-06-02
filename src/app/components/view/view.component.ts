import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ExpAddService } from 'src/app/services/exp-add.service';
import { AccUtillService } from 'src/app/services/acc-utill.service';
//https://namitamalik.github.io/Realtime-Update-in-Angular2/
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public expenses;
  public selectedDateVal = formatDate(new Date(), 'yyyy-MM-dd', 'en-US').toString();

  constructor(
    private expAddService: ExpAddService,
    private readonly accUtill: AccUtillService) { }

  ngOnInit() {

    this.expAddService.selectedDate$
      .subscribe(
        dateVal => {
          this.selectedDateVal = dateVal.toString();
          this.getExpenses(this.selectedDateVal);
        })

    this.expAddService.refreshNeeded$
      .subscribe(() => {
        this.getExpenses(this.selectedDateVal);
      })

    this.getExpenses(this.selectedDateVal);
  }

  getExpenses(date) {
    this.expAddService.getExpense(date).subscribe(
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

}


