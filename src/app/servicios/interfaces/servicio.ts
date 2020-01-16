import { IVehiculo } from '../../vehiculos/interfaces/vehiculo';

export interface IServicio {
    fechaDesde: Date;
    fechaHasta: Date;
    fechaCancelacion?: Date;
    motivoCancelacion?: string;
    numeroReserva: number;
    vehiculo: IVehiculo;
}
