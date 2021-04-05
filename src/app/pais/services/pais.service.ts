import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.eu/rest/v2';

  get httpParams() {
    return new HttpParams().set(
      'fields',
      'name;capital;alpha2Code;flag;population'
    );
  }

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Pais[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    return this.http
      .get<Pais[]>(url, { params: this.httpParams })
      .pipe(tap(console.log)); // este pipe usa tap de rxjs/operators que pasa los datos a console.log;
  }

  buscarCapital(termino: string): Observable<Pais[]> {
    //https://restcountries.eu/rest/v2/capital/{capital}
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http
      .get<Pais[]>(url, { params: this.httpParams })
      .pipe(tap(console.log));
  }

  buscarPorCodigo(termino: string): Observable<Pais> {
    const url = `${this.apiUrl}/alpha/${termino}`;
    return this.http.get<Pais>(url).pipe(tap(console.log));
  }

  buscarPorRegion(termino: string): Observable<Pais[]> {
    const url: string = `${this.apiUrl}/region/${termino}`;
    return this.http
      .get<Pais[]>(url, { params: this.httpParams })
      .pipe(tap(console.log));
  }
}
