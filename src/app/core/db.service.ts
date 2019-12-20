import { Injectable } from '@angular/core';
import { Task } from './tasks/task.model';

@Injectable()
export class DbService {
  tasks: Task[];

  constructor() {
    this.tasks = [];
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  create(value: Task) {
    value.id = this.generateId();
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    this.tasks.push(value);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  edit(value, id) {
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = this.tasks.findIndex(i => i.id === id);
    value.id = id;
    this.tasks[index] = value;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getAll() {
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    return this.tasks;
  }

  get(id) {
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = this.tasks.findIndex(i => i.id === id);
    return this.tasks[index];
  }

  delete(id) {
    const index = this.tasks.findIndex(i => i.id === id);
    this.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
