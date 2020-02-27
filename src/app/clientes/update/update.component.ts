import { Component, OnInit, Input } from '@angular/core';
import { ICliente } from '../interfaces/cliente';
import { ClientesService } from '../services/clientes.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @Input() cliente: ICliente;
  editableClienteForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService
    ) {}

  ngOnInit() {
    this.editableClienteForm = this.formBuilder.group({
      id: [this.cliente.id, Validators.required],
      nroDocumento: [this.cliente.nroDocumento, Validators.required],
      apellido: [this.cliente.apellido, Validators.required],
      nombre: [this.cliente.nombre, Validators.required],
      email: [this.cliente.email, Validators.required],
      telefono: [this.cliente.telefono, Validators.required],
      direccion: [this.cliente.direccion, Validators.required],
      activo: [this.cliente.activo]
    });
  }

  onSubmit() {
    if (this.editableClienteForm.valid) {
      this.clientesService.Update(this.editableClienteForm.value).subscribe(response => {}, (error) => {}, () =>  this.activeModal.close());
    }
  }

}
