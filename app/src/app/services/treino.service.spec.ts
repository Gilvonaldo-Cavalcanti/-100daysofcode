import { TestBed } from '@angular/core/testing';

import { TreinoService } from './treino.service';

describe('TreinoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreinoService = TestBed.get(TreinoService);
    expect(service).toBeTruthy();
  });
});
