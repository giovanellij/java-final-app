import { Component, OnInit, Input } from '@angular/core';
import { IVehiculo } from '../interfaces/vehiculo';
import { NgbDate, NgbActiveModal, NgbModal, NgbDateParserFormatter, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { VehiculosService } from '../services/vehiculos.service';
import { IServicio } from '../../servicios/interfaces/servicio';

@Component({
  selector: 'app-alquilar',
  templateUrl: './alquilar.component.html',
  styleUrls: ['./alquilar.component.css']
})
export class AlquilarComponent implements OnInit {

  @Input() vehiculo: IVehiculo;

  public date: NgbDate;
  public hoveredDate: NgbDate;
  public isCollapsed = true;
  public fecha: NgbDateStruct;

  private servicio: IServicio;
  private clienteId = 0;


  constructor(
    public activeModal: NgbActiveModal,
    private vehiculosService: VehiculosService,
    private modalService: NgbModal,
    public calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    ) {
    }

  ngOnInit() {
  }

  alquilarVehiculo() {

    this.servicio = {
      clienteId: +this.clienteId,
      fecServicio: `${this.fecha.year}-${this.fecha.month}-${this.fecha.day}`,
      fecCancelacion: null,
      nroReserva: Math.floor(Math.random() * 100).toString(),
      vehiculoId: this.vehiculo.id
    };

    this.vehiculosService.Alquilar(this.servicio).subscribe(response => {}, (error) => {}, () =>  this.activeModal.close());
  }

  receiveSelectedClienteEvent(id: number) {
    this.clienteId = id;
  }
}
