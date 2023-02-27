import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Country } from '../interfaces/pais.interface';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v2';

  // crea un get para abreviar params
  get httpParams () {
    return new HttpParams().set('fields', 'name,capital,alpha3Code,flag,population,region,translations,numericCode')
  }

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  getPaisPorAlpha(id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url, { params: this.httpParams });
  }

  buscarRegion( region: string ): Observable<Country[]> {
    // optimizando http
    const url = `${this.apiUrl}/regionalbloc/${region}`;
    // en el caso de evitar ser redundante se puede colocar { params } en lugar de { params: params }
    return this.http.get<Country[]>(url, { params: this.httpParams })
      .pipe(
        tap( console.log )
      )
  }

}
