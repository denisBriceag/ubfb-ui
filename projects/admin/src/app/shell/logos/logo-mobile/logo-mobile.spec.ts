import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoMobile } from './logo-mobile';

describe('LogoMobile', () => {
  let component: LogoMobile;
  let fixture: ComponentFixture<LogoMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoMobile],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoMobile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
