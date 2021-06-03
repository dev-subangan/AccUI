import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './components/add/add.component';
import { ViewComponent } from './components/view/view.component';
import { ExpenditureComponent } from './components/expenditure/expenditure.component';
import { IncomeComponent } from './components/income/income.component';
import { MenuItemComponent } from './components/add/menu-item/menu-item.component';
import { MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { AddTypeComponent } from './components/add-type/add-type.component';
import { ExpAddService } from './services/exp-add.service';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ViewComponent,
    ExpenditureComponent,
    IncomeComponent,
    MenuItemComponent,
    AddTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  providers: [ExpAddService],
  bootstrap: [AppComponent],
  entryComponents: [
    AddTypeComponent
  ]
})
export class AppModule { }