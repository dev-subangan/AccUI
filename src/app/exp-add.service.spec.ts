import { TestBed } from '@angular/core/testing';

import { ExpAddService } from './exp-add.service';

describe('ExpAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpAddService = TestBed.get(ExpAddService);
    expect(service).toBeTruthy();
  });
});
