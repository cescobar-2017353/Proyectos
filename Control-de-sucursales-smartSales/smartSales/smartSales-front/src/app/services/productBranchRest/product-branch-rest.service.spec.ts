import { TestBed } from '@angular/core/testing';

import { ProductBranchRestService } from './product-branch-rest.service';

describe('ProductBranchRestService', () => {
  let service: ProductBranchRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductBranchRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
