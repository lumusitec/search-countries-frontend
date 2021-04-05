import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  //hayError: boolean = false;
  //paises: Pais[] = [];
  pais!: Pais;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(({ id }) => {
    //   this.paisService.buscarPorCodigo(id).subscribe((pais) => {
    //     this.paises.push(pais);
    //     [this.pais] = this.paises;
    //   });
    // });

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.buscarPorCodigo(id)),
        tap(console.log)
      )
      .subscribe((pais) => (this.pais = pais));
  }
}
