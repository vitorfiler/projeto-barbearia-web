import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoDeVendaComponent } from './historico-de-venda.component';

describe('HistoricoDeVendaComponent', () => {
  let component: HistoricoDeVendaComponent;
  let fixture: ComponentFixture<HistoricoDeVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoDeVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoDeVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
