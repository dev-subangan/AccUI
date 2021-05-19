import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  navLinks=[
    {path:'expenditure',label:'Expenditure'},
    {path:'income',label:'Income'}
  ]
  title = 'accUI';
}
