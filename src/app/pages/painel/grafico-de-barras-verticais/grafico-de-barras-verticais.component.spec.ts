import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDeBarrasVerticaisComponent } from './grafico-de-barras-verticais.component';

describe('GraficoDeBarrasVerticaisComponent', () => {
  let component: GraficoDeBarrasVerticaisComponent;
  let fixture: ComponentFixture<GraficoDeBarrasVerticaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoDeBarrasVerticaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoDeBarrasVerticaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
