import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {}

  get getImagenUrl() {
    // /upload/usuarios/no-image

    if (this.img?.includes('https')) {
      // console.log(this.img);
      // console.log('google');

      return this.img;
    }

    if (this.img) {
      // console.log(this.img);
      // console.log('local');

      return `${base_url}/upload/usuarios/${this.img}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }
  }

  imprimirUsuario() {
    console.log(this.img);
  }
}