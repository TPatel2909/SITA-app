import { TestBed } from '@angular/core/testing';

import { AppworksDataService } from './appworks-data.service';

describe('AppworksDataService', () => {
  let service: AppworksDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppworksDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
