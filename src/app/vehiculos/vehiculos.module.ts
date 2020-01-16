import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { FeedComponent } from './feed/feed.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { AlquilarComponent } from './alquilar/alquilar.component';


@NgModule({
  declarations: [FeedComponent, CreateComponent, UpdateComponent, AlquilarComponent],
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  entryComponents: [
    CreateComponent,
    UpdateComponent,
    AlquilarComponent
  ]
})
export class VehiculosModule { }
