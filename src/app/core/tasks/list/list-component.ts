import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list-component.html',
  styleUrls: ['./list-component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Task>;
  displayedColumns: string[];
  tasks$: Observable<Task[]>;

  constructor(private tasksService: TasksService) {
    this.dataSource = new MatTableDataSource<Task>();
    this.displayedColumns = ['name', 'description', 'complete', 'action'];
    this.tasks$ = this.tasksService.tasks$;
  }

  ngOnInit() {
    // this.dataSource.data = this.tasksService.getAll();
  }

  ngAfterViewInit() {
    this.tasks$.subscribe(result => {
      console.log(result);
    });
  }

  onEdit(element, taskId) {
  }

  onDelete(taskId) {

  }
}
