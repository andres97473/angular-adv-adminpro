import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  private imgSubs?: Subscription;
  public cargando: boolean = true;

  constructor(
    private hospitalService: HospitalService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    // revargar imagen al actualizar

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(200))
      .subscribe((img) => {
        this.cargarHospitales();
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      // console.log(hospitales);
      this.cargando = false;
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    // console.log(hospital);
    if (hospital._id) {
      this.hospitalService
        .actualizarHospital(hospital._id, hospital.nombre)
        .subscribe((resp) => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        });
    }
  }

  eliminarHospital(hospital: Hospital) {
    // console.log(hospital);

    Swal.fire({
      title: 'Borrar Hospital?',
      text: `Esta a punto de borrar ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (hospital._id) {
          this.hospitalService
            .borrarHospital(hospital._id)
            .subscribe((resp) => {
              this.cargarHospitales();
              Swal.fire('Borrado', hospital.nombre, 'success');
            });
        }
      }
    });
  }

  async abrirSweetAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    });

    if (value) {
      if (value.trim().length > 0) {
        this.hospitalService.crearHospital(value).subscribe((resp: any) => {
          // console.log(resp);
          this.hospitales.push(resp.hospital);
        });
      }
    }

    // console.log(value);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.hospitales = this.hospitalesTemp;
    }
    this.busquedasService
      .buscar('hospitales', termino)
      .subscribe((resultados: Hospital[]) => {
        this.hospitales = resultados;
      });
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id,
      hospital.img
    );
  }
}
