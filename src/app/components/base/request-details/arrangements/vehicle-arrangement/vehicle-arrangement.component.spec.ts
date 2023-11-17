import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleArrangementComponent } from './vehicle-arrangement.component';

describe('ArrangementsComponent', () => {
  let component: VehicleArrangementComponent;
  let fixture: ComponentFixture<VehicleArrangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleArrangementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleArrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
