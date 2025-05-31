import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [TaskListComponent, TaskFormComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})

export class TaskPageComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAll().subscribe((data) => (this.tasks = data));
  }

  onCreateTask(data: { title: string, description?: string }) {
    this.taskService.create(data).subscribe((newTask) => {
      this.tasks = [newTask, ...this.tasks];
    });
  }
  selectedTask: Task | null = null;

  onEditTask(task: Task) {
    this.selectedTask = task;
  }

  onUpdateTask(updated: Task) {
    this.taskService.update(updated.id, updated).subscribe(() => {
      this.tasks = this.tasks.map(t => t.id === updated.id ? updated : t);
      this.selectedTask = null;
    });
  }

  onDeleteTask(id: string) {
    this.taskService.delete(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

  onToggleCompleted(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.update(updatedTask.id, updatedTask).subscribe(() => {
      this.tasks = this.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    });
  }
}
