import { TestBed } from '@angular/core/testing';

import { SectionmasterService } from './sectionmaster.service';

describe('SectionmasterService', () => {
  let service: SectionmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
