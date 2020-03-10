import { Injectable } from '@angular/core';
import { IServicio } from '../interfaces/servicio';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICriteriaServicio } from '../interfaces/criteriaServicio';

@Injectable({
  providedIn: 'root'
})
export class AlquileresService {

  private API: string = environment.api;

  private options = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    })
  };

 alquileres: IServicio[] = [
    // {
    //   fechaDesde: new Date(2020, 1, 1),
    //   fechaHasta: new Date(2020, 2, 1),
    //   numeroReserva: 1,
    //   vehiculo: {
    //     id: 1,
    //     alquilado: false,
    //     patente: 'ABC 123',
    //     descripcion: 'AUDI A3',
    //     servicios: []
    //   }
    // },
    // {
    //   fechaDesde: new Date(2020, 1, 3),
    //   fechaHasta: new Date(2020, 1, 7),
    //   numeroReserva: 2,
    //   vehiculo: {
    //     id: 2,
    //     alquilado: false,
    //     patente: 'ABC 123',
    //     descripcion: 'AUDI A5',
    //     servicios: []
    //   }
    // },
    // {
    //   fechaDesde: new Date(2020, 1, 1),
    //   fechaHasta: new Date(2020, 2, 1),
    //   numeroReserva: 1,
    //   vehiculo: {
    //     id: 3,
    //     alquilado: false,
    //     patente: 'ABC 123',
    //     descripcion: 'AUDI A7',
    //     servicios: []
    //   }
    // },
  ];

  constructor(
    private http: HttpClient
  ) { }

  GetByCliente() {
    const clienteId = localStorage.getItem('clienteId');

    const url = `${this.API}/serviciosByCliente/${clienteId}`;

    return this.http.get(url).pipe(
      map((servicios: IServicio[]) => {
        return servicios;
      })
    );
  }

  CancelarServicio(servicio: IServicio) {
    const url = `${this.API}/serviciosDevolverByServicio`;
    return this.http.post<IServicio>(url, servicio, this.options);
  }

  GetByFilter(filter?: ICriteriaServicio) {

    let url = `${this.API}/servicios`;

    if (filter === null) {
      return this.http.get(url).pipe(
        map((servicios: IServicio[]) => {
          return servicios;
        })
      );
    }

    url += 'Filtered';

    return this.http.post(url, filter, this.options).pipe(
      map((servicios: IServicio[]) => {
        return servicios;
      })
    );
  }
}
