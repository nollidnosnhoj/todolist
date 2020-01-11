import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TodoItem } from '../models/todo.model';
import { TodolistService } from '../services/todolist.service';

@Component({
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss']
})
export class AddTodoComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todolistService: TodolistService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      content: new FormControl('', [Validators.maxLength(500)])
    });
  }

  get f() { return this.addForm.controls; }

  addItem() {
    if (this.addForm.invalid) return;

    const newTodo: TodoItem = {
      ...this.addForm.getRawValue(),
      id: ''
    };

    this.todolistService.addItem(newTodo);

    this.router.navigate(['/']);
  }

}
