import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/_utils/dados-ausentes/dados-ausentes.component.spec.ts
import { DadosAusentesComponent } from './dados-ausentes.component';

describe('DadosAusentesComponent', () => {
  let component: DadosAusentesComponent;
  let fixture: ComponentFixture<DadosAusentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosAusentesComponent ]
=======
import { GradePromocoesComponent } from './grade-promocoes.component';

describe('GradePromocoesComponent', () => {
  let component: GradePromocoesComponent;
  let fixture: ComponentFixture<GradePromocoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradePromocoesComponent ]
>>>>>>> f328d9a1e4b76d677ba2397cf95c0798bec6bf9a:src/app/pages/servicos/exibicao-promocoes/grade-promocoes/grade-promocoes.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:src/app/_utils/dados-ausentes/dados-ausentes.component.spec.ts
    fixture = TestBed.createComponent(DadosAusentesComponent);
=======
    fixture = TestBed.createComponent(GradePromocoesComponent);
>>>>>>> f328d9a1e4b76d677ba2397cf95c0798bec6bf9a:src/app/pages/servicos/exibicao-promocoes/grade-promocoes/grade-promocoes.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
