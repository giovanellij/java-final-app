import { Injectable } from '@angular/core';
import { ICliente } from '../interfaces/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { LoginService } from '../../security/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private API: string = environment.api;

  private options = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    })
  };

  constructor(
    private http: HttpClient,
  ) { }

  bloquear(clientes: ICliente) {
    const url = `${this.API}/clientes/${clientes.id}`;
    return this.http.delete<ICliente>(url);
  }

  desbloquear(cliente: ICliente) {
    const url = `${this.API}/clientes/${cliente.id}`;
    return this.http.delete<ICliente>(url);
  }

  GetAll() {
    return this.http.get(`${this.API}/clientes`).pipe(
      map((clientes: ICliente[]) => {
        return clientes;
      })
    );
  }

  GetAllActivos() {
    return this.http.get(`${this.API}/clientesActivos`).pipe(
      map((clientes: ICliente[]) => {
        return clientes;
      })
    );
  }

  GetByFilter(filter?: any) {
    if (filter === null) {
      return this.http.get(`${this.API}/clientes`).pipe(
        map((clientes: ICliente[]) => {
          return clientes;
        })
      );
    }

    const standardFilter = filter.toLowerCase();

    return this.http.get(`${this.API}/clientes`).pipe(
      map((clientes: ICliente[]) => {
        return clientes.filter(
          x => x.nombre.toLowerCase().includes(standardFilter)
            || x.apellido.toLowerCase().includes(standardFilter)
            || x.email.toLowerCase().includes(standardFilter)
            || x.telefono.toLowerCase().includes(standardFilter));
      })
    );
  }

  Save(cliente: ICliente) {
    const url = `${this.API}/clientes`;
    return this.http.post<ICliente>(url, cliente, this.options);
  }

  Update(cliente: ICliente) {
    const url = `${this.API}/clientes/${cliente.id}`;
    return this.http.put<ICliente>(url, cliente, this.options);
  }
}
