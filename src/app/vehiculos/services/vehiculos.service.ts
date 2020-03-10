import { Injectable } from '@angular/core';
import { IVehiculo } from '../interfaces/vehiculo';
import { IServicio } from '../../servicios/interfaces/servicio';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from '../../security/services/login.service';

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
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  Alquilar(servicio: IServicio) {
    console.log(servicio);
    const url = `${this.API}/servicios`;
    return this.http.post<IServicio>(url, servicio, this.options);
  }

  Devolver(vehiculo: IVehiculo) {
    const url = `${this.API}/serviciosDevolver`;
    return this.http.post<IVehiculo>(url, vehiculo, this.options);
  }

  GetByFilter(filter?: any) {

    let url = `${this.API}/vehiculos`;

    if (!this.loginService.isAdmin()) {
      url += 'Disponibles';
    }

    if (!filter) {
      return this.http.get(url).pipe(
        map((vehiculos: IVehiculo[]) => {
          return vehiculos;
        })
      );
    }

    return this.http.post(`${this.API}/vehiculosFiltered`, filter, this.options).pipe(
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
    const url = `${this.API}/vehiculos/${vehiculo.id}`;
    return this.http.put<IVehiculo>(url, vehiculo, this.options);
  }
}
