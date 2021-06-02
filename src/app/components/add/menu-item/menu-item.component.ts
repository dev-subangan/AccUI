import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ExpAddService } from 'src/app/services/exp-add.service';
import { AddTypeComponent } from '../../add-type/add-type.component';
import { NavItem } from './nav-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() items: NavItem[];
  @Input() parentId: number;
  @ViewChild('childMenu', { static: true }) public childMenu;

  constructor(
    public router: Router,
    private expAddService: ExpAddService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  onSelectType(typeId: string) {
    this.expAddService.CallComponentMethod(typeId);
  }

  addType(parentId) {
    this.dialog.open(AddTypeComponent, { data: { parentId: parentId } });
  }

}
