import { TestBed } from '@angular/core/testing';

import { TemaDiaNoiteService } from './tema-dia-noite.service';

describe('TemaDiaNoiteService', () => {
  let service: TemaDiaNoiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemaDiaNoiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
