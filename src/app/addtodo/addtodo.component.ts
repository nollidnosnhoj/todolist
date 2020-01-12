import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TodolistService } from '../services/todolist.service';
import { AlertService } from '../services/alert.service';
import { TodoItem } from '../models/todo.model';

@Component({
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss']
})
export class AddTodoComponent implements OnInit {

  constructor(
    private todolistService: TodolistService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() { }

  addItem(item: TodoItem) {
    this.todolistService.addItem(item);

    this.alertService.success("Successfully added.");

    this.router.navigate(['/']);
  }

}
