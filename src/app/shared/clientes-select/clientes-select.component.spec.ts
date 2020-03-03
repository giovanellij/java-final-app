import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesSelectComponent } from './clientes-select.component';

describe('ClientesSelectComponent', () => {
  let component: ClientesSelectComponent;
  let fixture: ComponentFixture<ClientesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
