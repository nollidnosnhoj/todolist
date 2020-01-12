import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TodolistService } from '../services/todolist.service';
import { AlertService } from '../services/alert.service';

@Component({
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss']
})
export class AddTodoComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todolistService: TodolistService,
    private alertService: AlertService,
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

    this.todolistService.addItem({ 
      ... this.addForm.getRawValue(),
      id: '' 
    });

    this.alertService.success("Successfully added.");

    this.router.navigate(['/']);
  }

}
