import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  constructor(private _sidebarService: SidebarService) {
    this.menuItems = _sidebarService.menu;
    //console.log(this.menuItems);
  }

  ngOnInit(): void {
    customInitFunctions();
  }
}
