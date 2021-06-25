import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VERSION } from '@angular/material';
import { ExpenditureType } from 'src/app/models/models';
import { AccUtillService } from 'src/app/services/acc-utill.service';
import { ExpAddService } from 'src/app/services/exp-add.service';
import { SelectedDateService } from 'src/app/services/selected-date.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addExpenseForm: FormGroup;
  selectedDate;
  typeId: number;
  typeValue: string = "Select expenditure";

  version = VERSION;
  expenditureTypes: ExpenditureType[];

  constructor(private fb: FormBuilder,
    private expAddService: ExpAddService,
    private readonly accUtill: AccUtillService,
    private readonly selectedDateService: SelectedDateService
  ) { }

  ngOnInit(): void {

    this.expAddService.pushMessage.subscribe((x) => {
      this.typeId = x;
      this.expAddService.getTypeByid(this.typeId).subscribe((x) => {
        this.typeValue = x.data.slice(0, -1);
      });
      this.addExpenseForm.patchValue({ typeId: x });
    });
    this.inilizeForm(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'));

    this.expAddService.refreshType$
      .subscribe(() => {
        this.getAllTypes();
      })

    this.getAllTypes();

    this.selectedDateService.selectedDate$
      .subscribe(
        dateVal => {
          this.inilizeForm(dateVal.toString());
        });

  }

  inilizeForm(date) {
    this.addExpenseForm = this.fb.group({
      date: [date, Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      typeId: ['', Validators.required],
      note: ['']
    });
  }

  addExpense() {
    this.expAddService.expenditureSave(this.addExpenseForm.value).subscribe(
      response => this.accUtill.showNotification("Expenditure Saved"),
      error => console.error('Error!', error)
    );

    this.selectedDate = this.getDate.value;
    this.addExpenseForm.reset();
    this.inilizeForm(this.selectedDate);
    this.typeValue = "Select expenditure";
  }

  get getDate() {
    return this.addExpenseForm.get('date');
  }

  get getAmount() {
    return this.addExpenseForm.get('amount');
  }

  get getTypeId() {
    return this.addExpenseForm.get('typeId');
  }

  updateSelectedDate() {
    this.selectedDateService.updateDate(this.getDate.value);
  }

  getAllTypes() {
    this.expAddService.getAllTypes().subscribe(
      response => this.expenditureTypes = response,
      error => console.error('Error!', error)
    );
  }
}

