import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../services/vehiculos.service';
import { IVehiculo } from '../interfaces/vehiculo';
import { Router } from '@angular/router';
import { NgbModal, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlquilarComponent } from '../alquilar/alquilar.component';
import { ISearchVehiculoCriteria } from '../interfaces/criteria';
import { LoginService } from '../../security/services/login.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public filterForm: FormGroup;
  public isCollapsed = false;
  public vehiculos: IVehiculo[];
  public criteria: ISearchVehiculoCriteria;

  constructor(
    private vehiculosService: VehiculosService,
    private loginService: LoginService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
  ) {
    this.filterForm = this.formBuilder.group({
      searchTextForm: this.formBuilder.group({searchText: ['']}),
      extendedFilterForm: this.formBuilder.group({
        pendientesDevolucion: [true],
        disponibles: [true],
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
      pendientesDevolucion: this.filterForm.value.extendedFilterForm.pendientesDevolucion,
      searchText: this.filterForm.value.searchTextForm.searchText,
    };

    this.loadVehiculos(this.criteria);
  }
  devolverVehiculo(vehiculo: IVehiculo) {
    this.vehiculosService.Devolver(vehiculo).subscribe(response => { console.log(response); this.loadVehiculos(null); }, (error) => {});
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
  loadVehiculos(searchValue?: ISearchVehiculoCriteria) {
    this.vehiculosService.GetByFilter(searchValue).subscribe(
      (vehiculos: IVehiculo[]) => {
        this.vehiculos = vehiculos;
        console.log(this.vehiculos);
      }
    );
  }
  isAdmin() {
    return this.loginService.isAdmin();
  }
}
