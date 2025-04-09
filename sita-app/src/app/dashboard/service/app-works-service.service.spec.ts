import { TestBed } from '@angular/core/testing';

import { AppWorksServiceService } from './app-works-service.service';

describe('AppWorksServiceService', () => {
  let service: AppWorksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppWorksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
