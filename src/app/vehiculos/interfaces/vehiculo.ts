import { IServicio } from '../../servicios/interfaces/servicio';
export interface IVehiculo {
    id: number;
    patente: string;
    descripcion?: string;
    alquilado: boolean;
    categoriaId: number;
    servicios: IServicio[];
}

export interface ICreateVehiculo {
  id: number;
  patente: string;
  descripcion?: string;
  alquilado: boolean;
  categoriaId: number;
  servicios: IServicio[];
  createdBy: string;
}
