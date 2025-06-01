import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCreateUserDialog } from './confirm-create-user-dialog.component';

describe('ConfirmCreateUserDialogComponent', () => {
  let component: ConfirmCreateUserDialog;
  let fixture: ComponentFixture<ConfirmCreateUserDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCreateUserDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmCreateUserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
