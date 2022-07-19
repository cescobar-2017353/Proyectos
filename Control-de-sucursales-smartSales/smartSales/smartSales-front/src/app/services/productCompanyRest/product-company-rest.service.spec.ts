import { TestBed } from '@angular/core/testing';

import { ProductCompanyRestService } from './product-company-rest.service';

describe('ProductCompanyRestService', () => {
  let service: ProductCompanyRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCompanyRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
