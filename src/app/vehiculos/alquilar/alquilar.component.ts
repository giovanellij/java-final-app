import { Component, OnInit, Input } from '@angular/core';
import { IVehiculo } from '../interfaces/vehiculo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDate, NgbActiveModal, NgbModal, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { VehiculosService } from '../services/vehiculos.service';

@Component({
  selector: 'app-alquilar',
  templateUrl: './alquilar.component.html',
  styleUrls: ['./alquilar.component.css']
})
export class AlquilarComponent implements OnInit {

  @Input() vehiculo: IVehiculo;

  newAlquilerForm: FormGroup;

  public fromDate: NgbDate;
  public hoveredDate: NgbDate;
  public isCollapsed = true;
  public toDate: NgbDate;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private vehiculosService: VehiculosService,
    private modalService: NgbModal,
    public calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    ) {

    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

    this.newAlquilerForm = this.formBuilder.group({
      fechaDesde: ['', Validators.required],
      fechaHasta: ['', Validators.required],
      numeroReserva: [0, Validators.required],
      vehiculo: [this.vehiculo, Validators.required],
    });

    }

  ngOnInit() {
  }

  onSubmit() {
    if (this.newAlquilerForm.valid) {
      this.vehiculosService.Alquilar(this.newAlquilerForm.value);
      this.activeModal.close();
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }
  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }
  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
