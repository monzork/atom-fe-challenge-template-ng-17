import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskPageComponent } from './task-page.component';
import { TaskService } from '../../../../services/task.service';
import { of } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: '',
      completed: false,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Some desc',
      completed: true,
      createdAt: new Date()
    }
  ];

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['getAll', 'create', 'delete', 'update']);

    await TestBed.configureTestingModule({
      imports: [TaskPageComponent, TaskFormComponent, TaskListComponent, NoopAnimationsModule],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tasks on init', () => {
    taskServiceSpy.getAll.and.returnValue(of(mockTasks));
    fixture.detectChanges(); // triggers ngOnInit

    expect(component.tasks).toEqual(mockTasks);
    expect(taskServiceSpy.getAll).toHaveBeenCalled();
  });

  it('should create a new task and add it to the top of the list', () => {
    const newTask: Task = {
      id: '3',
      title: 'New Task',
      description: '',
      completed: false,
      createdAt: new Date()
    };

    taskServiceSpy.create.and.returnValue(of(newTask));
    component.tasks = [...mockTasks];

    component.onCreateTask({ title: 'New Task' });

    expect(taskServiceSpy.create).toHaveBeenCalledWith({ title: 'New Task' });
    expect(component.tasks[0]).toEqual(newTask);
  });

  it('should update a task in the list', () => {
    const updatedTask: Task = { ...mockTasks[0], title: 'Updated Title' };

    taskServiceSpy.update.and.returnValue(of(updatedTask));
    component.tasks = [...mockTasks];

    component.onUpdateTask(updatedTask);

    expect(taskServiceSpy.update).toHaveBeenCalledWith(updatedTask.id, updatedTask);
    expect(component.tasks.find(t => t.id === updatedTask.id)?.title).toBe('Updated Title');
    expect(component.selectedTask).toBeNull();
  });

  it('should toggle task completion', () => {
    const taskToToggle = mockTasks[0];
    const toggledTask = { ...taskToToggle, completed: !taskToToggle.completed };

    taskServiceSpy.update.and.returnValue(of(toggledTask));
    component.tasks = [...mockTasks];

    component.onToggleCompleted(taskToToggle);

    expect(taskServiceSpy.update).toHaveBeenCalledWith(taskToToggle.id, toggledTask);
    expect(component.tasks.find(t => t.id === taskToToggle.id)?.completed).toBeTrue();
  });

  it('should set selectedTask when editing', () => {
    const task = mockTasks[0];
    component.onEditTask(task);

    expect(component.selectedTask).toEqual(task);
  });
});
