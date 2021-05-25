import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddTypeComponent } from './components/add-type/add-type.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ExpAddService {

  baseUrl = "http://localhost:8081/acc/expenditure";

  private _refreshNeeded$ = new Subject<void>();

  private _refreshType$ = new Subject<void>();

  private _selectedDateSource = new Subject<String>();
  selectedDate$ = this._selectedDateSource.asObservable();
  updateDate(dateVal) {
    this._selectedDateSource.next(dateVal);
  }

  public pushMessage = new Subject<any>();

  CallComponentMethod(message) {
    this.pushMessage.next(message);
  }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  get refreshType$() {
    return this._refreshType$;
  }

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  public expenditureSave(expenditure) {
    return this.http.post<any>(this.baseUrl + "/save", expenditure)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  public getExpense(date) {
    return this.http.get<any>(this.baseUrl + "/getByDate/" + date);
  }

  public getExpenseMonth(month) {
    return this.http.get<any>(this.baseUrl + "/getByMonth/" + month);
  }

  public getExpenseYear(year) {
    return this.http.get<any>(this.baseUrl + "/getByYear/" + year);
  }

  public getExpenseAll() {
    return this.http.get<any>(this.baseUrl + "/getAll");
  }

  public deleteExpense(id) {
    return this.http.get<any>(this.baseUrl + "/delete/" + id)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  public getAllTypes() {
    return this.http.get<any>(this.baseUrl + "/type/all");
  }

  public getTypeByid(id: number) {
    return this.http.get<any>(this.baseUrl + "/type/" + id);
  }

  public getremainingMasterTypes(typeId: number) {
    return this.http.get<any>(this.baseUrl + "/type/remainingMasterType/" + typeId);
  }

  public saveType(type) {
    return this.http.post<any>(this.baseUrl + "/type/addType", type).pipe(
      tap(() => {
        this._refreshType$.next();
      })
    );
  }
}
