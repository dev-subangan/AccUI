import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { ExpAddService } from './exp-add.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { ViewMonthComponent } from './view-month/view-month.component';
import { ViewYearComponent } from './view-year/view-year.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTabsModule } from '@angular/material/tabs';
import { ExpenditureComponent } from './expenditure/expenditure.component'
import {RouterModule,Routes} from '@angular/router';
import { IncomeComponent } from './income/income.component'
const appRoutes:Routes=[
  {path:'',redirectTo:'/expenditure',pathMatch:'full'},
  {path:'expenditure',component:ExpenditureComponent},
  {path:'income',component:IncomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ViewComponent,
    ViewMonthComponent,
    ViewYearComponent,
    ViewAllComponent,
    ExpenditureComponent,
    IncomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [ExpAddService],
  bootstrap: [AppComponent]
})
export class AppModule { }