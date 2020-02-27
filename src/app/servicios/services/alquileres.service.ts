import { Injectable } from '@angular/core';
import { IServicio } from '../interfaces/servicio';

@Injectable({
  providedIn: 'root'
})
export class AlquileresService {

 alquileres: IServicio[] = [
    {
      fechaDesde: new Date(2020, 1, 1),
      fechaHasta: new Date(2020, 2, 1),
      numeroReserva: 1,
      vehiculo: {
        id: 1,
        alquilado: false,
        patente: 'ABC 123',
        descripcion: 'AUDI A3',
        servicios: []
      }
    },
    {
      fechaDesde: new Date(2020, 1, 3),
      fechaHasta: new Date(2020, 1, 7),
      numeroReserva: 2,
      vehiculo: {
        id: 2,
        alquilado: false,
        patente: 'ABC 123',
        descripcion: 'AUDI A5',
        servicios: []
      }
    },
    {
      fechaDesde: new Date(2020, 1, 1),
      fechaHasta: new Date(2020, 2, 1),
      numeroReserva: 1,
      vehiculo: {
        id: 3,
        alquilado: false,
        patente: 'ABC 123',
        descripcion: 'AUDI A7',
        servicios: []
      }
    },
  ];

  constructor() { }

  GetByFilter(filter?: string) {
    return this.alquileres;
  }
}
