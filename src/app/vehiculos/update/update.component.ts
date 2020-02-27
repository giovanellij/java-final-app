import { Component, OnInit, Input } from '@angular/core';
import { IVehiculo } from '../interfaces/vehiculo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VehiculosService } from '../services/vehiculos.service';

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
    ) {}

  ngOnInit() {
    this.editableVehiculoForm = this.formBuilder.group({
      id: [this.vehiculo.id],
      patente: [this.vehiculo.patente, Validators.required],
      descripcion: [this.vehiculo.descripcion, Validators.required],
      alquilado: [this.vehiculo.alquilado]
    });
  }

  onSubmit() {
    if (this.editableVehiculoForm.valid) {
      this.vehiculosService.Update(this.editableVehiculoForm.value).subscribe(response => {}, (error) => {}, () =>  this.activeModal.close());
    }
  }

}
