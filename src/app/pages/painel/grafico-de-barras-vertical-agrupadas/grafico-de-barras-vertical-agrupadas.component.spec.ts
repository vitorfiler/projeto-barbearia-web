import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDeBarrasVerticalAgrupadasComponent } from './grafico-de-barras-vertical-agrupadas.component';

describe('GraficoDeBarrasVerticalAgrupadasComponent', () => {
  let component: GraficoDeBarrasVerticalAgrupadasComponent;
  let fixture: ComponentFixture<GraficoDeBarrasVerticalAgrupadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoDeBarrasVerticalAgrupadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoDeBarrasVerticalAgrupadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
