import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbDate, NgbModal, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { IServicio } from '../../interfaces/servicio';
import { AlquileresService } from '../../services/alquileres.service';
import { Router } from '@angular/router';
import { CreateComponent } from '../create/create.component';

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
  public servicios: IServicio[];

  constructor(
    private alquileresService: AlquileresService,
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
      alquileres: [true],
      devoluciones: [false]
    });
  }

  ngOnInit() {
    this.loadServicios(null);
  }

  add() {
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.result.then((data) => {
      this.loadServicios();
    }, (reason) => {
      console.log('NO OK');
    });
  }
  alquilarVehiculo(servicio: IServicio) {
    console.log(`Usted va a alquilar ${servicio}`);
  }
  buscarPorFiltros() {
    console.log(this.filterForm.value);
    console.log(this.fromDate);
    console.log(this.toDate);
  }
  devolverVehiculo(servicio: IServicio) {
    console.log(`Usted va a devolver ${servicio}`);
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
  loadServicios(searchValue?: string) {
    this.servicios = this.alquileresService.GetByFilter(searchValue);
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
    this.loadServicios(searchValue);
  }
  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
