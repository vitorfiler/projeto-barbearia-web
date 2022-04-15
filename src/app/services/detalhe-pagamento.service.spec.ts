import { TestBed } from '@angular/core/testing';

import { DetalhePagamentoService } from './detalhe-pagamento.service';

describe('DetalhePagamentoService', () => {
  let service: DetalhePagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalhePagamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
