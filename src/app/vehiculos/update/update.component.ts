import { Component, OnInit, Input } from '@angular/core';
import { IVehiculo } from '../interfaces/vehiculo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VehiculosService } from '../services/vehiculos.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @Input() vehiculo: IVehiculo;
  editableVehiculoForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private vehiculosService: VehiculosService
    ) {

    }

  ngOnInit() {
    this.editableVehiculoForm = this.formBuilder.group({
      id: [this.vehiculo.id],
      patente: [this.vehiculo.patente, Validators.required],
      descripcion: [this.vehiculo.descripcion, Validators.required],
      alquilado: [this.vehiculo.alquilado, Validators.required],
      categoriaId: [this.vehiculo.categoriaId, Validators.required],
      createdBy: [localStorage.getItem('userName'), Validators.required]
    });
  }

  onSubmit() {
    console.log(this.editableVehiculoForm);
    if (this.editableVehiculoForm.valid) {
      this.vehiculosService.Update(this.editableVehiculoForm.value).subscribe(
        response => alert('El vehiculo ha sido creado satisfactoriamente'),
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            alert('Usted no tiene permiso para realizar esta accion');
          } else {
            alert('Ups XD');
          }
        },
        () =>  this.activeModal.close());
    }
  }

  receiveSelectedCategoriaEvent(id: number) {
    this.editableVehiculoForm.value.categoriaId = id;
  }

}
