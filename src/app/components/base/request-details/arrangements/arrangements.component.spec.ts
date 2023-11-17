import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangementsComponent } from './arrangements.component';

describe('ArrangementsComponent', () => {
  let component: ArrangementsComponent;
  let fixture: ComponentFixture<ArrangementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrangementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrangementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
