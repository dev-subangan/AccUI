import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './components/add/add.component';
import { ExpAddService } from './exp-add.service';
import { ViewComponent } from './components/view/view.component';
import { ViewMonthComponent } from './components/view-month/view-month.component';
import { ViewYearComponent } from './components/view-year/view-year.component';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { ExpenditureComponent } from './components/expenditure/expenditure.component';
import { IncomeComponent } from './components/income/income.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/expenditure', pathMatch: 'full' },
  { path: 'expenditure', component: ExpenditureComponent },
  { path: 'income', component: IncomeComponent }
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