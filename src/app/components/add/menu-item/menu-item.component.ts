import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExpAddService } from 'src/app/exp-add.service';
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

  constructor(public router: Router, private expAddService: ExpAddService) {
  }

  ngOnInit() {
  }

  onAddType(s: string) {
    console.log(s);
    this.expAddService.CallComponentMethod(s);
  }

  addType(parentId) {
    console.log("parent id ", parentId);
  }

}
