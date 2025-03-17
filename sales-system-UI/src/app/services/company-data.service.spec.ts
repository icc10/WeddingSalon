import { TestBed } from '@angular/core/testing';

import { CompanyDataServiceService } from './company-data-service.service';

describe('CompanyDataServiceService', () => {
  let service: CompanyDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
