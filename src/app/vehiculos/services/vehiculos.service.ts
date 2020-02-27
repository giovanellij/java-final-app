import { Injectable } from '@angular/core';
import { IVehiculo } from '../interfaces/vehiculo';
import { IServicio } from '../../servicios/interfaces/servicio';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private API: string = environment.api;

  private options = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    })
  };

  // vehiculos: IVehiculo[] = [
  //   {
  //     patente: 'ABC 123',
  //     descripcion: 'BMW M3',
  //     disponible: true
  //   },
  //   {
  //     patente: 'ABC 234',
  //     descripcion: 'BMW M3',
  //     disponible: false
  //   },
  //   {
  //     patente: 'ABC 345',
  //     descripcion: 'BMW M3',
  //     disponible: true
  //   },
  //   {
  //     patente: 'ABC 456',
  //     descripcion: 'BMW M3',
  //     disponible: false
  //   },
  //   {
  //     patente: 'ABC 567',
  //     descripcion: 'BMW M3',
  //     disponible: false
  //   },
  //   {
  //     patente: 'ABC 678',
  //     descripcion: 'BMW M3',
  //     disponible: true
  //   },
  // ];

  constructor(
    private http: HttpClient
  ) { }

  Alquilar(servicio: IServicio) {
    console.log(`Usted va a alquilar el vehiculo ${servicio.vehiculo.descripcion} el dia ${servicio.fechaDesde} hasta el dia ${servicio.fechaHasta}`);
  }

  Devolver(servicio: IServicio) {
    console.log(`Usted va a Devolver el vehiculo ${servicio.vehiculo.descripcion} el dia ${servicio.fechaDesde} hasta el dia ${servicio.fechaHasta}`);
  }

  GetByFilter(filter?: any) {
    return this.http.get(`${this.API}/vehiculos`).pipe(
      map((vehiculos: IVehiculo[]) => {
        return vehiculos;
      })
    );
  }

  Save(vehiculo: IVehiculo) {
    const url = `${this.API}/vehiculos`;
    return this.http.post<IVehiculo>(url, vehiculo, this.options);
  }

  Update(vehiculo: IVehiculo) {
    console.log(vehiculo);
    const url = `${this.API}/vehiculos/${vehiculo.id}`;
    return this.http.put<IVehiculo>(url, vehiculo, this.options);
  }
}
