import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { ClientesModule } from './clientes/clientes.module';
import { ServiciosModule } from './servicios/servicios.module';
import { HomeComponent } from './shared/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'vehiculos', loadChildren: () => VehiculosModule },
  { path: 'clientes', loadChildren: () => ClientesModule },
  { path: 'servicios', loadChildren: () => ServiciosModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
