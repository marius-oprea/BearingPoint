import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list-component.html',
  styleUrls: ['./list-component.scss']
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
    this.displayedColumns = ['name', 'description', 'complete', 'action'];
  }

  ngOnInit() {
    this.dataSource.data = [
      {name: 'A', description: 'AAA', isCompleted: true},
      {name: 'B', description: 'BBB', isCompleted: false},
      {name: 'C', description: 'CCC', isCompleted: true},
      {name: 'A', description: 'AAA', isCompleted: true},
      {name: 'B', description: 'BBB', isCompleted: false},
      {name: 'C', description: 'CCC', isCompleted: true},      
    ];
  }
}
