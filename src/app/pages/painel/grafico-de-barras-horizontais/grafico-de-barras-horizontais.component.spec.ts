import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDeBarrasHorizontaisComponent } from './grafico-de-barras-horizontais.component';

describe('GraficoDeBarrasHorizontaisComponent', () => {
  let component: GraficoDeBarrasHorizontaisComponent;
  let fixture: ComponentFixture<GraficoDeBarrasHorizontaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoDeBarrasHorizontaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoDeBarrasHorizontaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
