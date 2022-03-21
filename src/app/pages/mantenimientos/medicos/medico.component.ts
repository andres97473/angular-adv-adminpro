import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado?: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      // console.log(hospitalId);
      this.hospitalSeleccionado = this.hospitales.find(
        (h) => h._id === hospitalId
      );
      // console.log(this.hospitalSeleccionado);
    });
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.medicoService
      .obtenerMedicoPorId(id)
      .pipe(delay(100))
      .subscribe((medico) => {
        if (!medico) {
          this.router.navigateByUrl(`/dashboard/medicos`);
          return;
        }
        // console.log(medico);
        const { nombre, hospital } = medico;
        // console.log(nombre, hospital?._id);

        this.medicoSeleccionado = medico;

        this.medicoForm.setValue({ nombre, hospital: hospital?._id });
      });
  }

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        // console.log(hospitales);
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    // console.log(this.medicoSeleccionado);

    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };
      this.medicoService.actualizarMedico(data).subscribe((resp) => {
        console.log(resp);

        Swal.fire(
          'Medico Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );
      });
    } else {
      // crear
      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          // console.log(resp);
          Swal.fire(
            'Medico Creado',
            `${nombre} creado correctamente`,
            'success'
          );
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });
    }
  }
}
