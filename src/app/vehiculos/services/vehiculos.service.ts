import { Injectable } from '@angular/core';
import { IVehiculo, ICreateVehiculo } from '../interfaces/vehiculo';
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

  private username: string;

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
    this.username = localStorage.getItem('userName');
  }

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
      url = `${this.API}/vehiculosDisponibles`;
    } else {
      if (this.loginService.isAdmin()) {
        url = `${this.API}/vehiculos/admin`;
        console.log(url);
      }
    }

    if (!filter) {
      return this.http.get(`${url}`).pipe(
        map((vehiculos: IVehiculo[]) => {
          return vehiculos;
        })
      );
    }

    return this.http.post(`${this.API}/vehiculosFiltered/${this.username}`, filter, this.options).pipe(
      map((vehiculos: IVehiculo[]) => {
        return vehiculos;
      })
    );
  }

  Save(vehiculo: ICreateVehiculo) {
    const url = `${this.API}/vehiculos`;
    return this.http.post<ICreateVehiculo>(url, vehiculo, this.options);
  }

  Update(vehiculo: ICreateVehiculo) {
    const url = `${this.API}/vehiculos/${vehiculo.id}`;
    return this.http.put<ICreateVehiculo>(url, vehiculo, this.options);
  }
}
