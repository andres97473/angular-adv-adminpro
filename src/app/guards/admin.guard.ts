import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // return this.usuarioService.getRole === 'ADMIN_ROLE' ? true : false;

    if (this.usuarioService.getRole === 'ADMIN_ROLE') {
      return true;
      // sino devolver al dashboard
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }
}
