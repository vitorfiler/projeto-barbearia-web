import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDeLinhasComponent } from './grafico-de-linhas.component';

describe('GraficoDeLinhasComponent', () => {
  let component: GraficoDeLinhasComponent;
  let fixture: ComponentFixture<GraficoDeLinhasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoDeLinhasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoDeLinhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
