import { TestBed } from '@angular/core/testing';

import { ClientVisitCreateService } from './client-visit-create.service';

describe('ClientVisitCreateService', () => {
  let service: ClientVisitCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientVisitCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
