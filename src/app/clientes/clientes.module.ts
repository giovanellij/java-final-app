import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { CreateComponent } from './create/create.component';
import { FeedComponent } from './feed/feed.component';
import { UpdateComponent } from './update/update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CreateComponent, FeedComponent, UpdateComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [CreateComponent, UpdateComponent]
})
export class ClientesModule { }
