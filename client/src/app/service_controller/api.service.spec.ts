import { TestBed } from '@angular/core/testing';

import { ApiEmployeeService } from './employee-service';
import { ApiProjectService } from './project-service';

describe('ApiEmployeeService', () => {
  let service: ApiEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('ApiProjectService', () => {
  let service: ApiProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
