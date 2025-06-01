import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { Task } from '../../models/task.model';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Tarea 1',
      description: 'Descripción 1',
      completed: false,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Tarea 2',
      description: 'Descripción 2',
      completed: true,
      createdAt: new Date()
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.tasks = mockTasks;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tasks', () => {
    const taskCards = fixture.debugElement.queryAll(By.css('.task-card'));
    expect(taskCards.length).toBe(mockTasks.length);
  });

  it('should emit delete when delete button is clicked', () => {
    spyOn(component.delete, 'emit');
    const deleteButtons = fixture.debugElement.queryAll(By.css('button[aria-label="Eliminar tarea"]'));

    deleteButtons[0].nativeElement.click();
    expect(component.delete.emit).toHaveBeenCalledWith('1');
  });

  it('should emit edit when edit button is clicked', () => {
    spyOn(component.edit, 'emit');
    const editButtons = fixture.debugElement.queryAll(By.css('button[aria-label="Editar tarea"]'));

    editButtons[1].nativeElement.click();
    expect(component.edit.emit).toHaveBeenCalledWith(mockTasks[1]);
  });

  it('should emit toggleCompleted when checkbox is clicked', () => {
    spyOn(component.toggleCompleted, 'emit');
    const checkboxes = fixture.debugElement.queryAll(By.css('mat-checkbox'));

    checkboxes[0].triggerEventHandler('change', null); // simulate change event
    expect(component.toggleCompleted.emit).toHaveBeenCalledWith(mockTasks[0]);
  });
});
