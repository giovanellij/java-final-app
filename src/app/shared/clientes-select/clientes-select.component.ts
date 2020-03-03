import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClientesService } from '../../clientes/services/clientes.service';
import { ICliente } from '../../clientes/interfaces/cliente';

@Component({
  selector: 'app-clientes-select',
  templateUrl: './clientes-select.component.html',
  styleUrls: ['./clientes-select.component.css']
})
export class ClientesSelectComponent implements OnInit {

  @Output() selectClienteEvent: EventEmitter<number> = new EventEmitter<number>();
  public clientes: ICliente[];
  public id = 0;

  constructor(
    private clientesService: ClientesService
  ) { }

  ngOnInit() {
    this.clientesService.GetAll().subscribe((clientes: ICliente[]) => this.clientes = clientes);
  }

  sendSelectedOption(): void {
    this.selectClienteEvent.emit(this.id);
  }
}
