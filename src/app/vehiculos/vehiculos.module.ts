import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeedComponent } from './feed/feed.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { AlquilarComponent } from './alquilar/alquilar.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [FeedComponent, CreateComponent, UpdateComponent, AlquilarComponent],
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  entryComponents: [
    CreateComponent,
    UpdateComponent,
    AlquilarComponent
  ]
})
export class VehiculosModule { }
