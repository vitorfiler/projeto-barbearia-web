import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacoesReservasComponent } from './solicitacoes-reservas.component';

describe('SolicitacoesReservasComponent', () => {
  let component: SolicitacoesReservasComponent;
  let fixture: ComponentFixture<SolicitacoesReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacoesReservasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacoesReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
