import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewwordComponent } from './list-newword.component';

describe('ListNewwordComponent', () => {
  let component: ListNewwordComponent;
  let fixture: ComponentFixture<ListNewwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNewwordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNewwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
