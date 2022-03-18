import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
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

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        // console.log(hospitales);
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    this.medicoService
      .crearMedico(this.medicoForm.value)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire(
          'Medico Creado',
          `${resp.medico.nombre} creado correctamente`,
          'success'
        );
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
      });
  }
}
