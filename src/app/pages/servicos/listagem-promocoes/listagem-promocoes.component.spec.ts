import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemPromocoesComponent } from './listagem-promocoes.component';

describe('ListagemPromocoesComponent', () => {
  let component: ListagemPromocoesComponent;
  let fixture: ComponentFixture<ListagemPromocoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemPromocoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemPromocoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
