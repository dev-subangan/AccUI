import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExpAddService } from '../exp-add.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {

  public expenses;

  constructor(private expAddService: ExpAddService) { }

  ngOnInit() {

    this.expAddService.refreshNeeded$
      .subscribe(() => {
        this.getExpenses();
      })

    this.getExpenses();
  }

  getExpenses() {
    this.expAddService.getExpenseAll().subscribe(
      response => this.expenses = response.data,
      error => console.error('Error!', error)
    );
  }

}
