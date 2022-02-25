import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _fileUploadService: FileUploadService
  ) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    // console.log(this.perfilForm.value);
    this._usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(
      (resp: any) => {
        // console.log(resp.usuario);
        const { nombre, email } = resp.usuario;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire(
          'Usuario Actualizado!!',
          'Los cambios fueron guardados',
          'success'
        );
      },
      (err) => {
        // console.log(err.error.msg);
        Swal.fire('Error!!', err.error.msg, 'error');
      }
    );
  }

  cambiarImagen(event: any): any {
    const file = event.target.files[0];
    this.imagenSubir = file;
    // console.log(this.imagenSubir);

    // si se selecciona imagen cambiar la vista por la nueva imagen
    if (!file) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      // console.log(reader.result);
    };
  }

  subirImagen() {
    this._fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid || '')
      .then((img) => {
        this.usuario.img = img;
        Swal.fire(
          'Imagen Actualizada!!',
          'Imagen de usuario actualizada',
          'success'
        );
      })
      .catch((err) => {
        Swal.fire('Error!!', err.error.msg, 'error');
      });
  }
}
