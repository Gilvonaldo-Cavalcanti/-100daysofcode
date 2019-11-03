import { TestBed } from '@angular/core/testing';

import { RegistroTreinoService } from './registro-treino.service';

describe('RegistroTreinoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistroTreinoService = TestBed.get(RegistroTreinoService);
    expect(service).toBeTruthy();
  });
});
