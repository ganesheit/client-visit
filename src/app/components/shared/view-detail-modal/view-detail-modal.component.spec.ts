import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailModalComponent } from './view-detail-modal.component';

describe('ViewDetailModalComponent', () => {
  let component: ViewDetailModalComponent;
  let fixture: ComponentFixture<ViewDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
