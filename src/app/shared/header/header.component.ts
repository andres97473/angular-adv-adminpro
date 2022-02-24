import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public usuario: Usuario;
  constructor(private _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
    // console.log(this.imgUrl);
  }

  logout() {
    this._usuarioService.logout();
  }
}
