import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLanguageField } from './multi-language-field';

describe('MultiLanguageField', () => {
  let component: MultiLanguageField;
  let fixture: ComponentFixture<MultiLanguageField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiLanguageField],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiLanguageField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
