import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResetPassword } from './request-reset-password';

describe('RequestResetPassword', () => {
  let component: RequestResetPassword;
  let fixture: ComponentFixture<RequestResetPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestResetPassword],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestResetPassword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
