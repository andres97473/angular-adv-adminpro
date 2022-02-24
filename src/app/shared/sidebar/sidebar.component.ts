import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[] = [];
  public usuario: Usuario;
  constructor(
    private _sidebarService: SidebarService,
    private _usuarioService: UsuarioService
  ) {
    this.menuItems = _sidebarService.menu;
    //console.log(this.menuItems);
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {
    customInitFunctions();
  }
}
