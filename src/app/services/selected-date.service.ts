import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedDateService {

  constructor() {

  }

  private _selectedDateSource = new Subject<String>();
  selectedDate$ = this._selectedDateSource.asObservable();
  updateDate(dateVal) {
    this._selectedDateSource.next(dateVal);
  }

  setDate(year: string, month: string = '01', day: string = '01') {
    this.updateDate(year.concat('-', month, '-', day));
  }
}
