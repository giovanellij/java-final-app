import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesSelectComponent } from './clientes-select/clientes-select.component';
import { FormsModule } from '@angular/forms';
import { CategoriasSelectComponent } from './categorias-select/categorias-select.component';


@NgModule({
  declarations: [NavbarComponent, HomeComponent, FooterComponent, ClientesSelectComponent, CategoriasSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule
  ],
  exports: [NavbarComponent, HomeComponent, FooterComponent, ClientesSelectComponent, CategoriasSelectComponent],
})
export class SharedModule { }
