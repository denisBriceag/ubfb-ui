import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaterInfo } from './updater-info';

describe('UpdaterInfo', () => {
  let component: UpdaterInfo;
  let fixture: ComponentFixture<UpdaterInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdaterInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdaterInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
