import { TestBed } from '@angular/core/testing';

import { PdfuploadsService } from './pdfuploads.service';

describe('PdfuploadsService', () => {
  let service: PdfuploadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfuploadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
