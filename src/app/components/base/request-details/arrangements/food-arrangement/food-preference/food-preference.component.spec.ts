import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPreferenceComponent } from './food-preference.component';

describe('FoodArrangementComponent', () => {
  let component: FoodPreferenceComponent;
  let fixture: ComponentFixture<FoodPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodPreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
