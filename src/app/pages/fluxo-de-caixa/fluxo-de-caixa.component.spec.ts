import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoDeCaixa } from './fluxo-de-caixa.component';

describe('CaixaComponent', () => {
  let component: FluxoDeCaixa;
  let fixture: ComponentFixture<FluxoDeCaixa>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxoDeCaixa ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxoDeCaixa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
