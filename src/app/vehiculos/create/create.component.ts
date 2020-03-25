import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehiculosService } from '../services/vehiculos.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  newVehiculoForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private vehiculosService: VehiculosService
    ) {}

  ngOnInit() {
    this.newVehiculoForm = this.formBuilder.group({
      patente: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoriaId: [0, Validators.required],
      alquilado: [false, Validators.required],
      createdBy: [localStorage.getItem('userName'), Validators.required]
    });
  }

  onSubmit() {
    if (this.newVehiculoForm.valid) {
      this.vehiculosService.Save(this.newVehiculoForm.value).subscribe(
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
    this.newVehiculoForm.value.categoriaId = id;
  }

}
