import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './alquileres/feed/feed.component';
import { MisAlquileresComponent } from './alquileres/mis-alquileres/mis-alquileres.component';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [
  { path: '', component: FeedComponent, canActivate: [AdminGuard]},
  { path: 'mis-alquileres', component: MisAlquileresComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
