import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodArrangementComponent } from './food-arrangement.component';

describe('FoodArrangementComponent', () => {
  let component: FoodArrangementComponent;
  let fixture: ComponentFixture<FoodArrangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodArrangementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodArrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
