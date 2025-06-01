import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit create when form is submitted and no task is set', () => {
    spyOn(component.create, 'emit');

    component.form.setValue({ title: 'Test Task', description: 'Testing' });
    component.onSubmit();

    expect(component.create.emit).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Testing'
    });
  });

  it('should emit update if task is set', () => {
    const mockTask = {
      id: '1',
      title: 'Old Title',
      description: 'Old Desc',
      completed: false,
      createdAt: new Date()
    };

    component.task = mockTask;
    component.ngOnChanges({
      task: {
        previousValue: null,
        currentValue: mockTask,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    component.form.setValue({ title: 'Updated', description: 'Updated Desc' });
    spyOn(component.update, 'emit');
    component.onSubmit();

    expect(component.update.emit).toHaveBeenCalledWith({
      ...mockTask,
      title: 'Updated',
      description: 'Updated Desc'
    });
  });

  it('should not emit anything if form is invalid', () => {
    spyOn(component.create, 'emit');
    component.form.setValue({ title: '', description: 'desc' });
    component.onSubmit();
    expect(component.create.emit).not.toHaveBeenCalled();
  });
});
