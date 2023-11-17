import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventArrangementComponent } from './event-arrangement.component';

describe('FoodArrangementComponent', () => {
  let component: EventArrangementComponent;
  let fixture: ComponentFixture<EventArrangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventArrangementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventArrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
