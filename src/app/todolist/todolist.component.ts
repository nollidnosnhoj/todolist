import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../models/todo.model';
import { TodolistService } from '../services/todolist.service';

@Component({
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
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

  trackById(index, item: TodoItem) {
    return item.id;
  }
}
