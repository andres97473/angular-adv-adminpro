export interface Menu {
  titulo: string;
  icono: string;
  submenu: SubMenu[];
}

export interface SubMenu {
  titulo: string;
  url: string;
}
