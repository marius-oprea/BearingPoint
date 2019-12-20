import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { DbService } from '../db.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TasksService {
  readonly tasksSource: BehaviorSubject<Task[]>;
  readonly tasks$: Observable<any>;

  constructor(private httpClient: HttpClient, private db: DbService) {
    this.tasksSource = new BehaviorSubject<Task[]>([]);
    this.tasks$ = this.tasksSource.asObservable();

    this.getAllTasks();
  }

  set tasks(value: Task[]) {
    this.tasksSource.next(value);
  }

  get tasks(): Task[] {
    return this.tasksSource.getValue();
  }

  async dispatch(event: string, payload?: Task, id?: string) {
    switch (event) {
      case 'CREATE': {
        const currentTask = await this.create(payload).toPromise();
        this.tasks = [...this.tasks, currentTask];
        break;
      }

      case 'EDIT': {
        const currentTask = await this.edit(payload, id).toPromise();
        break;
      }
    }
  }

  create(value: Task): Observable<Task> {
    // const url = '/tasks';
    // return this.httpClient.post(url, body);

    return new Observable(observer => {
      this.db.create(value);

      observer.next(value);
      observer.complete();
    });
  }

  edit(value: Task, id: string): Observable<Task> {
    // const url = `/tasks/${id}`;
    // return this.httpClient.patch(url, body);

    return new Observable(observer => {
      this.db.edit(value, id);

      observer.next(value);
      observer.complete();
    });
  }

  async getAllTasks() {
    this.tasks = await this.getAll().toPromise();
  }


  getAll(): Observable<Task[]> {
    // const url = '/tasks';
    // return this.httpClient.get(url);

    return new Observable(observer => {
      const tasksList = this.db.getAll();

      observer.next(tasksList);
      observer.complete();
    });
  }
}
