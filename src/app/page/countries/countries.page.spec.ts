import { ComponentFixture, TestBed } from '@angular/core/testing';
import { countriesPage } from './countries.page';

describe('countriesPage', () => {
  let component: countriesPage;
  let fixture: ComponentFixture<countriesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(countriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
