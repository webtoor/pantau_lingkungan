import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantauSampahPlastikPage } from './pantau-sampah-plastik.page';

describe('PantauSampahPlastikPage', () => {
  let component: PantauSampahPlastikPage;
  let fixture: ComponentFixture<PantauSampahPlastikPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantauSampahPlastikPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantauSampahPlastikPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
