import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios = 0;
  public desde = 0;
  public cargando = true;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public imgSubs?: Subscription;

  constructor(
    private _usuarioService: UsuarioService,
    private _busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    // suscribirse al evento cuando se detecte que se hizo un cambio de imagen
    // para poder dar tiempo al servidor de recargar la imagen vamos a hacer un delay antes del suscribe
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => {
        // cargar usuarios al detectar cambio de imagen
        this.cargarUsuarios();
      });
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        if (usuarios.length !== 0) {
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        }
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    // console.log(termino);
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
    }
    this._busquedasService.buscar('usuarios', termino).subscribe(
      (resultados) => {
        // console.log(resultados);
        this.usuarios = resultados;
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  cambiarRole(usuario: Usuario) {
    // console.log(usuario);
    this._usuarioService.actualizarUsuario(usuario).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this._usuarioService.getUid) {
      Swal.fire('Error', 'No puede borrar su propio usuario', 'error');
    } else {
      Swal.fire({
        title: 'Borrar Usuario?',
        text: `Esta a punto de borrar a ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Borrar!',
      }).then((result) => {
        if (result.isConfirmed) {
          this._usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            );
          });
        }
      });
    }
  }

  abrirModal(usuario: Usuario) {
    //console.log(usuario);
    if (usuario.uid) {
      this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
    }
  }
}
