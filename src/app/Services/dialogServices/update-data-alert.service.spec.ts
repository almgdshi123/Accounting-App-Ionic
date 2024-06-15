import { TestBed } from '@angular/core/testing';

import { UpdateDataAlertService } from './update-data-alert.service';

describe('UpdateDataAlertService', () => {
  let service: UpdateDataAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDataAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
