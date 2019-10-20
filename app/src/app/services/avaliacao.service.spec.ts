import { TestBed } from '@angular/core/testing';

import { AvaliacoesService } from './avaliacao.service';

describe('AvaliacoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvaliacoesService = TestBed.get(AvaliacoesService);
    expect(service).toBeTruthy();
  });
});
