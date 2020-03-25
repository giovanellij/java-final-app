import { IServicio } from '../../servicios/interfaces/servicio';

export interface ICliente {
  id: string;
  nroDocumento: string;
  apellido: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  activo: boolean;
  servicios: IServicio[];
}

export interface ICreateCliente {
  id: string;
  nroDocumento: string;
  apellido: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  activo: boolean;
  createdBy: string;
}

