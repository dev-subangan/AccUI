import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenditureComponent } from './components/expenditure/expenditure.component';
import { IncomeComponent } from './components/income/income.component';


const routes: Routes = [
  { path: '', redirectTo: '/expenditure', pathMatch: 'full' },
  { path: 'expenditure', component: ExpenditureComponent },
  { path: 'income', component: IncomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
