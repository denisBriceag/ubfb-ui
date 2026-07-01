import { TestBed } from '@angular/core/testing';

import { UbfbAdminTitleStrategy } from './ubfb-admin-title-strategy';

describe('UbfbAdminTitleStrategy', () => {
  let service: UbfbAdminTitleStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbfbAdminTitleStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
