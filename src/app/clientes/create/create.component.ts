import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientesService } from '../services/clientes.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  newClienteForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService
    ) {}

  ngOnInit() {
    this.newClienteForm = this.formBuilder.group({
      nroDocumento: ['', Validators.required],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      activo: [true, Validators.required],
      createdBy: [localStorage.getItem('userName'), Validators.required]
    });
  }

  onSubmit() {
    if (this.newClienteForm.valid) {
      this.clientesService.Save(this.newClienteForm.value).subscribe(
        response => {
          alert('El cliente ha sido creado satisfactoriamente.');
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            alert('Usted no tiene permiso para realizar esta acción');
          } else {
            alert('Ups XD');
          }
        },
        () =>  this.activeModal.close());
    }
  }
}
