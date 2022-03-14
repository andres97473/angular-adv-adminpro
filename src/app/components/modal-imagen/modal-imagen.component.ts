import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [],
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir!: File;
  public imgTemp: any = null;
  constructor(
    public modalImagenService: ModalImagenService,
    public _fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo: any = this.modalImagenService.tipo;

    this._fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id || '')
      .then((img) => {
        Swal.fire(
          'Imagen Actualizada!!',
          'Imagen de usuario actualizada',
          'success'
        );
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      })
      .catch((err) => {
        Swal.fire('Error!!', err.error.msg, 'error');
      });
  }
}
