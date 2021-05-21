import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VERSION } from '@angular/material';
import { ExpAddService } from '../../exp-add.service';
import { NavItem } from './menu-item/nav-item';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addExpenseForm: FormGroup;
  selectedDate;

  version = VERSION;
  navItems: NavItem[];

  constructor(private fb: FormBuilder, private expAddService: ExpAddService) {
    this.getAllTypes();
  }

  ngOnInit(): void {

    this.expAddService.pushMessage.subscribe((x) => {
      this.addExpenseForm.patchValue({ typeId: x });
    });
    this.inilizeForm(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'));
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
    console.log(this.addExpenseForm.value);
    this.expAddService.expenditureSave(this.addExpenseForm.value).subscribe(
      response => console.log('Success!', response),
      error => console.error('Error!', error)
    );

    this.selectedDate = this.getDate.value;
    this.addExpenseForm.reset();
    this.inilizeForm(this.selectedDate);
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
    this.expAddService.updateDate(this.getDate.value);
  }

  getAllTypes() {
    this.expAddService.getAllTypes().subscribe(
      response => this.navItems = response,
      error => console.error('Error!', error)
    );

    console.log(this.navItems);
  }
}

