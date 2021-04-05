import { Component } from '@angular/core';

import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorCapitalComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Pais[] = [];
  paisesSugeridos: Pais[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  sugerencias(termino: string): void {
    this.paises = [];
    this.termino = termino;
    this.hayError = false;
    this.mostrarSugerencias = true;

    this.paisService.buscarCapital(termino).subscribe(
      (paises) => (this.paisesSugeridos = paises.splice(0, 10)),
      (error) => {
        this.paisesSugeridos = [];
      }
    );
  }

  buscar(termino: string): void {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital(this.termino).subscribe(
      (paises) => {
        this.paises = paises;
      },
      (error) => {
        this.hayError = true;
        this.paises = [];
      }
    );
  }

  buscarSugeridos(termino: string): void {
    this.buscar(termino);
  }
}
