import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [],
})
export class PorRegionComponent {
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Pais[] = [];

  constructor(private paisService: PaisService) {}

  activarRegion(region: string): void {
    if (region === this.regionActiva) return;

    this.regionActiva = region;
    this.paises = [];

    this.paisService
      .buscarPorRegion(region)
      .subscribe((paises) => (this.paises = paises));
  }

  getClaseCSS(region: string): string {
    return this.regionActiva === region
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }
}
