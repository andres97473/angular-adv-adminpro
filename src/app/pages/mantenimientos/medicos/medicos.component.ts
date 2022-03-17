import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit {
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  private imgSubs?: Subscription;

  public cargando: boolean = true;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();

    // revargar imagen al actualizar

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(200))
      .subscribe((img) => {
        this.cargarMedicos();
      });
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      // console.log(medicos);
      this.cargando = false;
      this.medicos = medicos;
      this.medicosTemp = medicos;
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }
}
