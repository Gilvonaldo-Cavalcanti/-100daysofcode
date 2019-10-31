import { TestBed } from '@angular/core/testing';

import { ProgressoService } from './progresso.service';

describe('ProgressoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressoService = TestBed.get(ProgressoService);
    expect(service).toBeTruthy();
  });
});
