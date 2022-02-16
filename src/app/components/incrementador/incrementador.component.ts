import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  // recibir valor
  @Input('valor') progreso = 30;
  @Input() btnClass: string = 'btn-primary';

  // emitir valor para escuchar en el componente donde se va a implementar
  @Output('valor') valorSalida: EventEmitter<number> =
    new EventEmitter<number>();

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      return (this.progreso = 100), this.valorSalida.emit(100);
    }
    if (this.progreso <= 0 && valor < 0) {
      return (this.progreso = 0), this.valorSalida.emit(0);
    }

    return (
      (this.progreso = this.progreso + valor),
      this.valorSalida.emit(this.progreso)
    );
  }

  onChange(nuevoValor: number) {
    // console.log(valor);
    if (nuevoValor >= 100) {
      return (this.progreso = 100), this.valorSalida.emit(100);
    } else if (nuevoValor <= 0) {
      return (this.progreso = 0), this.valorSalida.emit(0);
    } else {
      return (this.progreso = nuevoValor), this.valorSalida.emit(nuevoValor);
    }
  }
}
