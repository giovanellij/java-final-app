import { Injectable } from '@angular/core';
import { ICliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientes: ICliente[] = [
    {
      dni: '36444613',
      apellido: 'Giovanelli',
      nombre: 'Julian',
      email: 'jgiovanelli@hotmail.com',
      telefono: '3468417166',
      direccion: 'San Lorenzo 1680',
      activo: true
    },
    {
      dni: '36444613',
      apellido: 'Giovanelli',
      nombre: 'Julian',
      email: 'jgiovanelli@hotmail.com',
      telefono: '3468417166',
      direccion: 'San Lorenzo 1680',
      activo: true
    },
    {
      dni: '36444613',
      apellido: 'Giovanelli',
      nombre: 'Julian',
      email: 'jgiovanelli@hotmail.com',
      telefono: '3468417166',
      direccion: 'San Lorenzo 1680',
      activo: true
    },
    {
      dni: '36444613',
      apellido: 'Giovanelli',
      nombre: 'Julian',
      email: 'jgiovanelli@hotmail.com',
      telefono: '3468417166',
      direccion: 'San Lorenzo 1680',
      activo: true
    },
    {
      dni: '36444613',
      apellido: 'Giovanelli',
      nombre: 'Julian',
      email: 'jgiovanelli@hotmail.com',
      telefono: '3468417166',
      direccion: 'San Lorenzo 1680',
      activo: true
    },
    {
      dni: '36444613',
      apellido: 'Giovanelli',
      nombre: 'Julian',
      email: 'jgiovanelli@hotmail.com',
      telefono: '3468417166',
      direccion: 'San Lorenzo 1680',
      activo: true
    },
  ];

  constructor() { }

  bloquear(cliente: ICliente) {
    console.log(`Bloquear cliente: ${cliente.nombre}`);
  }

  desbloquear(cliente: ICliente) {
    console.log(`Desloquear cliente: ${cliente.nombre}`);
  }

  GetByFilter(filter?: string) {
    if (filter === null) {
      return this.clientes;
    }
    const standardFilter = filter.toLowerCase();
    return this.clientes.filter(
      x => x.nombre.toLowerCase().includes(standardFilter)
        || x.apellido.toLowerCase().includes(standardFilter)
        || x.email.toLowerCase().includes(standardFilter)
        || x.telefono.toLowerCase().includes(standardFilter));
  }

  Save(cliente: ICliente) {
    this.clientes.push(cliente);
  }

  Update(cliente: ICliente) {
    this.clientes.forEach(v => {
      if (v.apellido === cliente.apellido) {
        // v.descripcion = vehiculo.descripcion;
      }
    });
  }
}
