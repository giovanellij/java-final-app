import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosRoutingModule } from './servicios-routing.module';

import * as AlquileresFeed from './alquileres/feed/feed.component';
import { CreateComponent } from './alquileres/create/create.component';
import { MisAlquileresComponent } from './alquileres/mis-alquileres/mis-alquileres.component';


@NgModule({
  declarations: [
    AlquileresFeed.FeedComponent,
    CreateComponent,
    MisAlquileresComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ServiciosRoutingModule
  ],
  entryComponents: [ CreateComponent ]
})
export class ServiciosModule { }
