import { TestBed } from '@angular/core/testing';

import { GeocacheService } from './geocache.service';

describe('GeocacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeocacheService = TestBed.get(GeocacheService);
    expect(service).toBeTruthy();
  });
});
