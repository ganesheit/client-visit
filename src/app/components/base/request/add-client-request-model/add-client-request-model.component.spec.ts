import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientRequestModelComponent } from './add-client-request-model.component';

describe('AddClientRequestModelComponent', () => {
  let component: AddClientRequestModelComponent;
  let fixture: ComponentFixture<AddClientRequestModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientRequestModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientRequestModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
