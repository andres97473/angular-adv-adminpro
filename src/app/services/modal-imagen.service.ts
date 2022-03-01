import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal = true;

  public tipo: 'usuarios' | 'medicos' | 'hospitales' = 'usuarios';
  public id?: string;
  public img?: string;

  public nuevaImagen = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  constructor() {}

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img?: string
  ) {
    this._ocultarModal = false;
    this.tipo = tipo || '';
    this.id = id;
    this.img = img;

    if (img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }
  cerrarModal() {
    this._ocultarModal = true;
  }
}
