import { Injectable } from '@angular/core';
import { ICliente, ICreateCliente } from '../interfaces/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private API: string = environment.api;

  private username: string;

  private options = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    })
  };

  constructor(
    private http: HttpClient,
  ) {
    this.username = localStorage.getItem('userName');
   }

  bloquear(clientes: ICliente) {
    const url = `${this.API}/clientes/${clientes.id}/${this.username}`;
    return this.http.delete<ICliente>(url);
  }

  desbloquear(cliente: ICliente) {
    const url = `${this.API}/clientes/${cliente.id}/${this.username}`;
    return this.http.delete<ICliente>(url);
  }

  GetAll() {
    return this.http.get(`${this.API}/clientes/${this.username}`).pipe(
      map((clientes: ICliente[]) => {
        return clientes;
      })
    );
  }

  GetAllActivos() {
    return this.http.get(`${this.API}/clientesActivos/${this.username}`).pipe(
      map((clientes: ICliente[]) => {
        return clientes;
      })
    );
  }

  GetByFilter(filter?: any) {
    if (filter === null) {
      return this.http.get(`${this.API}/clientes/${this.username}`).pipe(
        map((clientes: ICliente[]) => {
          return clientes;
        })
      );
    }

    const standardFilter = filter.toLowerCase();

    return this.http.get(`${this.API}/clientes/${this.username}`).pipe(
      map((clientes: ICliente[]) => {
        return clientes.filter(
          x => x.nombre.toLowerCase().includes(standardFilter)
            || x.apellido.toLowerCase().includes(standardFilter)
            || x.email.toLowerCase().includes(standardFilter)
            || x.telefono.toLowerCase().includes(standardFilter));
      })
    );
  }

  Save(cliente: ICreateCliente) {
    const url = `${this.API}/clientes`;
    return this.http.post<ICreateCliente>(url, cliente, this.options);
  }

  Update(cliente: ICreateCliente) {
    const url = `${this.API}/clientes/${cliente.id}`;
    return this.http.put<ICreateCliente>(url, cliente, this.options);
  }
}
