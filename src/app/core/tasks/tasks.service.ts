import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { DbService } from '../db.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TasksService {
  readonly tasksSource: BehaviorSubject<Task[]>;
  readonly editableTaskSource: BehaviorSubject<Task>;
  readonly isEditModeSource: BehaviorSubject<boolean>;
  readonly tasks$: Observable<Task[]>;
  readonly editableTask$: Observable<Task>;
  readonly isEditMode$: Observable<boolean>;

  constructor(private httpClient: HttpClient, private db: DbService) {
    this.tasksSource = new BehaviorSubject<Task[]>([]);
    this.tasks$ = this.tasksSource.asObservable();

    this.editableTaskSource = new BehaviorSubject<Task>({} as Task);
    this.editableTask$ = this.editableTaskSource.asObservable();

    this.isEditModeSource = new BehaviorSubject<boolean>(false);
    this.isEditMode$ = this.isEditModeSource.asObservable();

    this.getAllTasks();
  }

  set tasks(value: Task[]) {
    this.tasksSource.next(value);
  }

  get tasks(): Task[] {
    return this.tasksSource.getValue();
  }

  set editableTask(value: Task) {
    this.editableTaskSource.next(value);
  }

  get editableTask(): Task {
    return this.editableTaskSource.getValue();
  }

  set isEditMode(value: boolean) {
    this.isEditModeSource.next(value);
  }

  get isEditMode(): boolean {
    return this.isEditModeSource.getValue();
  }

  async dispatch(event: string, payload?: any, id?: string) {
    switch (event) {
      case 'CREATE': {
        await this.create(payload).toPromise();
        this.getAllTasks();
        break;
      }

      case 'EDIT': {
        await this.edit(payload).toPromise();
        this.getAllTasks();
        break;
      }

      case 'DELETE': {
        await this.delete(id).toPromise();
        this.getAllTasks();
        break;
      }

      case 'COMPLETE': {
        await this.complete(id).toPromise();
        this.getAllTasks();
        break;
      }

      case 'OPEN_FORM_IN_EDIT_MODE': {
        console.log(payload);
        this.isEditMode = payload.isEditMode;
        this.editableTask = payload.task;

        console.log(this.editableTask);
      }
    }
  }

  create(value: Task): Observable<Task> {
    // const url = '/tasks';
    // const body = value;
    // return this.httpClient.post(url, body);

    return new Observable(observer => {
      this.db.create(value);

      observer.next(value);
      observer.complete();
    });
  }

  edit(value: Task): Observable<Task> {
    // const url = `/tasks/${id}`;
    // const body = value;
    // return this.httpClient.patch(url, body);

    return new Observable(observer => {
      this.db.edit(value, value.id);

      observer.next(value);
      observer.complete();
    });
  }

  complete(id: string): Observable<Task> {
    // const url = `/tasks/${id}`;
    // return this.httpClient.patch(url, isCompleted);

    return new Observable(observer => {

      const value = this.db.get(id);
      value.isCompleted = !value.isCompleted;
      this.db.edit(value, id);

      observer.next(value);
      observer.complete();
    });
  }

  delete(id: string): Observable<Task[]> {
    // const url = '/tasks/${id}';
    // return this.httpClient.delete(url);

    return new Observable(observer => {
      this.db.delete(id);

      observer.next();
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
