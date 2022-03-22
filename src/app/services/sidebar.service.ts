import { Injectable, OnInit } from '@angular/core';
import { Menu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class SidebarService implements OnInit {
  // menu: Menu[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'Graficas', url: 'grafica1' },
  //       { titulo: 'Rxjs', url: 'rxjs' },
  //       { titulo: 'Promesas', url: 'promesas' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //     ],
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hospitales', url: 'hospitales' },
  //       { titulo: 'Medicos', url: 'medicos' },
  //     ],
  //   },
  // ];
  ngOnInit(): void {
    this.cargarMenu();
  }

  public menu!: Menu[];

  cargarMenu() {
    const nMenu = localStorage.getItem('menu');
    if (nMenu) {
      this.menu = JSON.parse(nMenu) || [];
    }
  }
}
