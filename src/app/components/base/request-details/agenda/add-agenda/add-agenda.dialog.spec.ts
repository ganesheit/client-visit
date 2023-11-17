import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgendaDialog } from './add-agenda.dialog';

describe('AddAgendaDialog', () => {
  let component: AddAgendaDialog;
  let fixture: ComponentFixture<AddAgendaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAgendaDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAgendaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
