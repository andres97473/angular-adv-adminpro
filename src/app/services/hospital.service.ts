import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  get getToken(): string {
    return localStorage.getItem('token') || '';
  }

  get getHeaders() {
    return {
      headers: {
        'x-token': this.getToken,
      },
    };
  }

  cargarHospitales() {
    // http://localhost:3000/api/hospitales
    const url = `${base_url}/hospitales`;
    return this.http.get<any>(url, this.getHeaders).pipe(
      map((resp: { ok: boolean; hospitales: Hospital[] }) => {
        return resp.hospitales;
      })
    );
  }

  crearHospital(nombre: string) {
    // http://localhost:3000/api/hospitales
    const url = `${base_url}/hospitales`;
    return this.http.post(url, { nombre }, this.getHeaders);
  }

  actualizarHospital(_id: string, nombre: string) {
    // http://localhost:3000/api/hospitales
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url, { nombre }, this.getHeaders);
  }

  borrarHospital(_id: string) {
    // http://localhost:3000/api/hospitales
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.getHeaders);
  }
}
