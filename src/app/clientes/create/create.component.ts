import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientesService } from '../services/clientes.service';

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
    private clienesService: ClientesService
    ) {}

  ngOnInit() {
    this.newClienteForm = this.formBuilder.group({
      dni: ['', Validators.required],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      activo: [true]
    });
  }

  onSubmit() {
    if (this.newClienteForm.valid) {
      this.clienesService.Save(this.newClienteForm.value);
      this.activeModal.close();
    }
  }

}
