import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoDesktop } from './logo-desktop';

describe('LogoDesktop', () => {
  let component: LogoDesktop;
  let fixture: ComponentFixture<LogoDesktop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoDesktop],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoDesktop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
