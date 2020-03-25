import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasSelectComponent } from './categorias-select.component';

describe('CategoriasSelectComponent', () => {
  let component: CategoriasSelectComponent;
  let fixture: ComponentFixture<CategoriasSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
