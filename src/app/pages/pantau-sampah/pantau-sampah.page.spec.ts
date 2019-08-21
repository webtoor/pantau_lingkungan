import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantauSampahPage } from './pantau-sampah.page';

describe('PantauSampahPage', () => {
  let component: PantauSampahPage;
  let fixture: ComponentFixture<PantauSampahPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantauSampahPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantauSampahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
