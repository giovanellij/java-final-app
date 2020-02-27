import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehiculosService } from '../services/vehiculos.service';

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
      alquilado: [false]
    });
  }

  onSubmit() {
    if (this.newVehiculoForm.valid) {
      this.vehiculosService.Save(this.newVehiculoForm.value).subscribe(response => {}, (error) => {}, () =>  this.activeModal.close());
    }
  }

}
