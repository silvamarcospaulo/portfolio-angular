import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin-repository.service';

describe('AdminRepositoryService', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
