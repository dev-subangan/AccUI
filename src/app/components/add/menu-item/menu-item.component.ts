import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';
import { ExpenditureType } from 'src/app/models/models';
import { ExpAddService } from 'src/app/services/exp-add.service';
import { AddTypeComponent } from '../../add-type/add-type.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() expenditureTypes: ExpenditureType[];
  @Input() isRootType: boolean;
  @ViewChild('childMenu', { static: true }) public childMenu;

  expenditureTypeId: number;

  constructor(
    public router: Router,
    private expAddService: ExpAddService,
    public dialog: MatDialog) { }

  ngOnInit() { }

  haveSubTypes(expenditureTypes: ExpenditureType): boolean {
    return expenditureTypes.subTypes && expenditureTypes.subTypes.length > 0;
  }

  onSelectType(typeId: string) {
    this.expAddService.CallComponentMethod(typeId);
  }

  addType() {
    this.dialog.open(AddTypeComponent, { data: { parentId: 0 } });
  }

  addSubType() {
    this.dialog.open(AddTypeComponent, { data: { parentId: this.expenditureTypeId } });
  }

  menuTopLeftPosition = { x: '0', y: '0' }

  // reference to the MatMenuTrigger in the DOM 
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger: MatMenuTrigger;

  onRightClick(event: MouseEvent, expenditureTypeId: number) {

    this.expenditureTypeId = expenditureTypeId;

    // preventDefault avoids to show the visualization of the right-click menu of the browser 
    event.preventDefault();

    // we record the mouse position in our object 
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';

    // we open the menu 
    // we pass to the menu the information about our object 
    this.matMenuTrigger.menuData = { item: "item" }

    // we open the menu 
    this.matMenuTrigger.openMenu();

  }
}
