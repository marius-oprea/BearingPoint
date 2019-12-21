import { Component } from '@angular/core';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list-component.html',
  styleUrls: ['./list-component.scss']
})
export class ListComponent {
  displayedColumns: string[];
  tasks$: Observable<Task[]>;

  constructor(private tasksService: TasksService) {
    this.displayedColumns = ['name', 'description', 'complete', 'action'];
    this.tasks$ = this.tasksService.tasks$;
  }

  onEdit(element, taskId) {
    this.tasksService.dispatch('OPEN_FORM_IN_EDIT_MODE', {isEditMode: true, task: element}, taskId);
  }

  onDelete(taskId) {
    this.tasksService.dispatch('DELETE', null, taskId);
  }

  onCompleteChange(element, taskId) {
    this.tasksService.dispatch('COMPLETE', null, taskId);
  }
}
