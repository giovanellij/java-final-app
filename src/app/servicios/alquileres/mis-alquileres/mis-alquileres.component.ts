import { Component, OnInit } from '@angular/core';
import { IServicio } from '../../interfaces/servicio';
import { AlquileresService } from '../../services/alquileres.service';

@Component({
  selector: 'app-mis-alquileres',
  templateUrl: './mis-alquileres.component.html',
  styleUrls: ['./mis-alquileres.component.css']
})
export class MisAlquileresComponent implements OnInit {

  servicios: IServicio[] = [];

  constructor(
    private alquileresService: AlquileresService
  ) { }

  ngOnInit() {
    this.loadServicios();
  }

  cancelarServicio(servicio: IServicio) {
    this.alquileresService.CancelarServicio(servicio)
      .subscribe(response => { console.log(response); this.loadServicios(); }, (error) => {});
  }

  loadServicios() {
    this.alquileresService.GetByCliente().subscribe(servicios => {
      this.servicios = servicios;
      console.log(this.servicios);
    });
  }

}
