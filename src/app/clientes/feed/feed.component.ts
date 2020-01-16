import { Component, OnInit } from '@angular/core';
import { ICliente } from '../interfaces/cliente';
import { ClientesService } from '../services/clientes.service';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  filterForm: FormGroup;
  clientes: ICliente[];

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      searchText: [''],
    });
  }

  ngOnInit() {
    this.loadClientes(null);
  }

  add() {
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.result.then((data) => {
      this.loadClientes();
    }, (reason) => {
      console.log('NO OK');
    });
  }
  bloquear(cliente: ICliente) {
    this.clientesService.bloquear(cliente);
  }
  desbloquear(cliente: ICliente) {
    this.clientesService.desbloquear(cliente);
  }
  edit(cliente: ICliente) {
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.cliente = cliente;
    modalRef.result.then((data) => {
      this.loadClientes();
    }, (reason) => {
      console.log('NO OK');
    });
  }
  loadClientes(searchValue?: string) {
    this.clientes = this.clientesService.GetByFilter(searchValue);
  }
  onSearchChange(searchValue: string): void {
    this.loadClientes(searchValue);
  }
}
