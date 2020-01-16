import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../services/vehiculos.service';
import { IVehiculo } from '../interfaces/vehiculo';
import { Router } from '@angular/router';
import { NgbModal, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlquilarComponent } from '../alquilar/alquilar.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public filterForm: FormGroup;
  public searchBox: FormGroup;
  public fromDate: NgbDate;
  public hoveredDate: NgbDate;
  public isCollapsed = true;
  public toDate: NgbDate;
  public vehiculos: IVehiculo[];

  constructor(
    private vehiculosService: VehiculosService,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.searchBox = this.formBuilder.group({
      searchText: [''],
    });
    this.filterForm = this.formBuilder.group({
      pendientesDevolucion: [false],
      disponibles: [false]
    });
  }

  ngOnInit() {
    this.loadVehiculos(null);
  }

  add() {
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.result.then((data) => {
      this.loadVehiculos();
    }, (reason) => {
      console.log('NO OK');
    });
  }
  alquilarVehiculo(vehiculo: IVehiculo) {
    const modalRef = this.modalService.open(AlquilarComponent, {size: 'lg'});
    modalRef.componentInstance.vehiculo = vehiculo;
    modalRef.result.then((data) => {
      this.loadVehiculos();
    }, (reason) => {
      console.log('NO OK');
    });
  }
  buscarPorFiltros() {
    console.log(this.filterForm.value);
    console.log(this.fromDate);
    console.log(this.toDate);
  }
  devolverVehiculo(vehiculo: IVehiculo) {
    console.log(`Usted va a devolver ${vehiculo.descripcion}`);
  }
  edit(vehiculo: IVehiculo) {
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.vehiculo = vehiculo;
    modalRef.result.then((data) => {
      this.loadVehiculos();
    }, (reason) => {
      console.log('NO OK');
    });
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
  loadVehiculos(searchValue?: string) {
    this.vehiculos = this.vehiculosService.GetByFilter(searchValue);
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
  onSearchChange(searchValue: string): void {
    this.loadVehiculos(searchValue);
  }
  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
