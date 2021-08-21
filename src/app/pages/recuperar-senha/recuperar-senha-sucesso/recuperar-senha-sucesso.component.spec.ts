import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarSenhaSucessoComponent } from './recuperar-senha-sucesso.component';

describe('RecuperarSenhaSucessoComponent', () => {
  let component: RecuperarSenhaSucessoComponent;
  let fixture: ComponentFixture<RecuperarSenhaSucessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperarSenhaSucessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarSenhaSucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
