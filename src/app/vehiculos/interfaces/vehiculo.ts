import { IServicio } from '../../servicios/interfaces/servicio';
export interface IVehiculo {
    id: number;
    patente: string;
    descripcion?: string;
    alquilado: boolean;
    servicios: IServicio[];
}
