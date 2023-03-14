import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private baseApi: string = 'https://restcountries.com/v3.1';
  private fields: string = 'fields=name,capital,ccn3,cca3,flags,population,name'
  //https://restcountries.com/v3.1/name/{name}

  constructor(private http : HttpClient) { }

  get httpParams() {
    return new HttpParams().set('fields',this.fields);
  }
  
  buscarPais(termino : string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.baseApi}/name/${termino}`,{ params : this.httpParams })
      //.pipe(
      //  tap(console.log)
      //);
  }

  buscarPaisPorCapital(termino : string): Observable<Country[]> {
    const params = new HttpParams()
      .set('fields',this.fields);
    return this.http
      .get<Country[]>(`${this.baseApi}/capital/${termino}`,{ params : this.httpParams });
  }

  buscarPaisPorCodigo(idPais : string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.baseApi}/alpha/${idPais}`);
  }

  buscarPaisPorRegion(region : string): Observable<Country[]> {
    const params = new HttpParams()
      .set('fields',this.fields);
    return this.http
      .get<Country[]>(`${this.baseApi}/region/${region}`,{ params : this.httpParams });
  }

}
