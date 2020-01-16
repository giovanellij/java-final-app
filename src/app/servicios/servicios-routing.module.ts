import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as AlquileresFeed from './alquileres/feed/feed.component';


const routes: Routes = [
  { path: '', component: AlquileresFeed.FeedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
