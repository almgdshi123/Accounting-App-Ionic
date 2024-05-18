import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContriesDetailPage } from './contries-detail.page';

describe('ContriesDetailPage', () => {
  let component: ContriesDetailPage;
  let fixture: ComponentFixture<ContriesDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContriesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
