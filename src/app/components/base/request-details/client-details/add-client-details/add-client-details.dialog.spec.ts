import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientDetailsDialog } from './add-client-details.dialog';

describe('AddClientDetailsDialog', () => {
  let component: AddClientDetailsDialog;
  let fixture: ComponentFixture<AddClientDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientDetailsDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientDetailsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
