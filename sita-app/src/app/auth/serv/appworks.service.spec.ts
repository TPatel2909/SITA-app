import { TestBed } from '@angular/core/testing';

import { AppworksService } from './appworks.service';

describe('AppworksService', () => {
  let service: AppworksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppworksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
