import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render form with email input and submit button', () => {
    const input = fixture.debugElement.query(By.css('input[type="email"]'));
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('should not emit login if form is invalid', () => {
    spyOn(component.login, 'emit');
    component.form.setValue({ email: '' });

    component.onSubmit();
    expect(component.login.emit).not.toHaveBeenCalled();
  });

  it('should emit login event with email if form is valid', () => {
    spyOn(component.login, 'emit');
    const testEmail = 'test@example.com';
    component.form.setValue({ email: testEmail });

    component.onSubmit();
    expect(component.login.emit).toHaveBeenCalledWith(testEmail);
  });

  it('should disable the button if form is invalid', () => {
    component.form.setValue({ email: '' });
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeTrue();
  });
});
