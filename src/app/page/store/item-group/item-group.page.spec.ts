import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemGroupPage } from './item-group.page';

describe('ItemGroupPage', () => {
  let component: ItemGroupPage;
  let fixture: ComponentFixture<ItemGroupPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
