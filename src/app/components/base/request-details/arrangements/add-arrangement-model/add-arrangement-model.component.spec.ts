import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArrangementModelComponent } from './add-arrangement-model.component';

describe('AddArrangementModelComponent', () => {
  let component: AddArrangementModelComponent;
  let fixture: ComponentFixture<AddArrangementModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArrangementModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArrangementModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
