import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { ClientesModule } from './clientes/clientes.module';
import { ServiciosModule } from './servicios/servicios.module';
import { HomeComponent } from './shared/home/home.component';
import { SecurityModule } from './security/security.module';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  // { path: '*', redirectTo: ''},
  { path: 'auth', loadChildren: () => SecurityModule },
  { path: 'vehiculos', loadChildren: () => VehiculosModule, canActivate: [AuthGuard]},
  { path: 'clientes', loadChildren: () => ClientesModule, canActivate: [AdminGuard]},
  { path: 'servicios', loadChildren: () => ServiciosModule, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
