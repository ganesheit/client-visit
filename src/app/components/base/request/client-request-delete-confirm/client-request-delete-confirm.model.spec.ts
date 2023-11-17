import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRequestDeleteConfirmModel } from './client-request-delete-confirm.model';

describe('ClientRequestDeleteConfirmModel', () => {
  let component: ClientRequestDeleteConfirmModel;
  let fixture: ComponentFixture<ClientRequestDeleteConfirmModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientRequestDeleteConfirmModel ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRequestDeleteConfirmModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
