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
        disponible: false,
        patente: 'ABC 123',
        descripcion: 'AUDI A3'
      }
    },
    {
      fechaDesde: new Date(2020, 1, 3),
      fechaHasta: new Date(2020, 1, 7),
      numeroReserva: 2,
      vehiculo: {
        disponible: false,
        patente: 'ABC 123',
        descripcion: 'AUDI A5'
      }
    },
    {
      fechaDesde: new Date(2020, 1, 1),
      fechaHasta: new Date(2020, 2, 1),
      numeroReserva: 1,
      vehiculo: {
        disponible: false,
        patente: 'ABC 123',
        descripcion: 'AUDI A7'
      }
    },
  ];

  constructor() { }

  GetByFilter(filter?: string) {
    return this.alquileres;
  }
}
