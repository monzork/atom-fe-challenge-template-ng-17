import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Task } from '../../models/task.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, CommonModule, MatCardModule, FormsModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})

export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() create = new EventEmitter<{ title: string; description: string }>();
  @Output() update = new EventEmitter<Task>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: '',
      description: ''
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { title, description } = this.form.value;

    if (this.task) {
      this.update.emit({ ...this.task, title, description });
    } else {
      this.create.emit({ title, description });
    }

    this.form.reset();
  }
}

