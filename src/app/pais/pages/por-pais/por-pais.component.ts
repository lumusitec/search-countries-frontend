import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  paises: Pais[] = [];
  paisesSugeridos: Pais[] = [];
  hayError: boolean = false;
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  sugerencias(termino: string) {
    this.paises = [];
    this.mostrarSugerencias = true;
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino).subscribe(
      (paises) => (this.paisesSugeridos = paises.splice(0, 5)),
      (error) => {
        this.paisesSugeridos = [];
      }
    );
  }

  buscar(termino: string): void {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(this.termino).subscribe(
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
