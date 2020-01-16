import { Injectable } from '@angular/core';
import { IVehiculo } from '../interfaces/vehiculo';
import { IServicio } from '../../servicios/interfaces/servicio';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  vehiculos: IVehiculo[] = [
    {
      patente: 'ABC 123',
      descripcion: 'BMW M3',
      disponible: true
    },
    {
      patente: 'ABC 234',
      descripcion: 'BMW M3',
      disponible: false
    },
    {
      patente: 'ABC 345',
      descripcion: 'BMW M3',
      disponible: true
    },
    {
      patente: 'ABC 456',
      descripcion: 'BMW M3',
      disponible: false
    },
    {
      patente: 'ABC 567',
      descripcion: 'BMW M3',
      disponible: false
    },
    {
      patente: 'ABC 678',
      descripcion: 'BMW M3',
      disponible: true
    },
  ];

  constructor() { }

  Alquilar(servicio: IServicio) {
    console.log(`Usted va a alquilar el vehiculo ${servicio.vehiculo.descripcion} el dia ${servicio.fechaDesde} hasta el dia ${servicio.fechaHasta}`);
  }

  GetByFilter(filter?: string) {
    if (filter === null) {
      return this.vehiculos;
    }
    return this.vehiculos.filter(x => x.descripcion.includes(filter) || x.patente.includes(filter));
  }

  Save(vehiculo: IVehiculo) {
    this.vehiculos.push(vehiculo);
  }

  Update(vehiculo: IVehiculo) {
    this.vehiculos.forEach(v => {
      if (v.patente === vehiculo.patente) {
        v.descripcion = vehiculo.descripcion;
      }
    });
  }
}
