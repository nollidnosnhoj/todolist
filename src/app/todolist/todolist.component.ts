import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../models/todo.model';
import { TodolistService } from '../services/todolist.service';

@Component({
  selector: 'app-todolist',
  template: `
<div class="todolist-container">
  <ng-container *ngFor="let item of todos">
      <app-todo 
          [item]="item"
          (updating)="updateItem($event)"
          (removing)="removeItem($event)"
      ></app-todo>
  </ng-container>
</div>
  `,
  styles: [
    ".todolist-container { margin: 0 auto; width: 700px; }"
  ]
})
export class TodolistComponent implements OnInit {

  todos: TodoItem[];

  constructor(private todolistService: TodolistService) { }

  ngOnInit() {
    this.todos = this.todolistService.getList();
  }

  updateItem(item: TodoItem) {
    this.todos = this.todolistService.updateItem(item);
  }

  removeItem(id: string) {
    this.todos = this.todolistService.removeItem(id);
  }

}
