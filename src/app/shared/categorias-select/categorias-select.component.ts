import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriasService } from '../../categorias/services/categorias.service';
import { ICategoria } from '../../categorias/interfaces/categorias';

@Component({
  selector: 'app-categorias-select',
  templateUrl: './categorias-select.component.html',
  styleUrls: ['./categorias-select.component.css']
})
export class CategoriasSelectComponent implements OnInit {

  @Output() selectCategoriaEvent: EventEmitter<number> = new EventEmitter<number>();
  public categorias: ICategoria[];
  public id = 0;

  constructor(
    private categoriasService: CategoriasService
  ) { }

  ngOnInit() {
    this.categoriasService.GetAll().subscribe((categorias: ICategoria[]) => {
      this.categorias = categorias;
      console.log(this.categorias);
    });
  }

  sendSelectedOption(): void {
    this.selectCategoriaEvent.emit(this.id);
  }

}
