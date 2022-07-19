import { TestBed } from '@angular/core/testing';

import { BranchRestService } from './branch-rest.service';

describe('BranchRestService', () => {
  let service: BranchRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
