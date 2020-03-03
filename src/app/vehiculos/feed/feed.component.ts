import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../services/vehiculos.service';
import { IVehiculo } from '../interfaces/vehiculo';
import { Router } from '@angular/router';
import { NgbModal, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlquilarComponent } from '../alquilar/alquilar.component';
import { ISearchVehiculoCriteria } from '../interfaces/criteria';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public filterForm: FormGroup;
  public fromDate: NgbDate;
  public hoveredDate: NgbDate;
  public isCollapsed = true;
  public toDate: NgbDate;
  public vehiculos: IVehiculo[];
  public criteria: ISearchVehiculoCriteria;

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
    this.filterForm = this.formBuilder.group({
      searchTextForm: this.formBuilder.group({searchText: ['']}),
      extendedFilterForm: this.formBuilder.group({
        pendientesDevolucion: [true],
        disponibles: [true],
        from: [this.fromDate, Validators.required],
        to: [this.toDate, Validators.required]
      }),
    });
  }

  ngOnInit() {
    this.loadVehiculos(null);
  }

  add() {
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.result.then((data) => {
      this.loadVehiculos(null);
    }, (reason) => {
      console.log('NO OK');
    });
  }
  alquilarVehiculo(vehiculo: IVehiculo) {
    const modalRef = this.modalService.open(AlquilarComponent);
    modalRef.componentInstance.vehiculo = vehiculo;
    modalRef.result.then((data) => {
      this.loadVehiculos(null);
    }, (reason) => {
      console.log('NO OK');
    });
  }
  buscarPorFiltros() {
    this.criteria = {
      disponibles: this.filterForm.value.extendedFilterForm.disponibles,
      from: `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`,
      pendientesDevolucion: this.filterForm.value.extendedFilterForm.pendientesDevolucion,
      searchText: this.filterForm.value.searchTextForm.searchText,
      to: `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`,
    };

    this.loadVehiculos(this.criteria);
  }
  devolverVehiculo(vehiculo: IVehiculo) {
    console.log(`Usted va a devolver ${vehiculo.descripcion}`);
  }
  edit(vehiculo: IVehiculo) {
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.vehiculo = vehiculo;
    modalRef.result.then((data) => {
      this.loadVehiculos(null);
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
  loadVehiculos(searchValue?: ISearchVehiculoCriteria) {
    this.vehiculosService.GetByFilter(searchValue).subscribe(
      (vehiculos: IVehiculo[]) => {
        this.vehiculos = vehiculos;
        console.log(this.vehiculos);
      }
    );
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
