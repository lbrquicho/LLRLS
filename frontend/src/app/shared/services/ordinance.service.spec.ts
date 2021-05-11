import { TestBed, inject } from '@angular/core/testing';

import { OrdinanceService } from './ordinance.service';

describe('OrdinanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdinanceService]
    });
  });

  it('should be created', inject([OrdinanceService], (service: OrdinanceService) => {
    expect(service).toBeTruthy();
  }));
});
