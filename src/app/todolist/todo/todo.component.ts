import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from 'src/app/models/todo.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input("item")
  todoItem: TodoItem;

  @Output("updating")
  updatingEvent: EventEmitter<TodoItem>;

  @Output("removing")
  removingEvent: EventEmitter<string>;

  isEditing: boolean;
  humanDate: string;

  today: Date;

  updateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService
  ) { 
    this.updatingEvent = new EventEmitter();
    this.removingEvent = new EventEmitter();
  }

  ngOnInit() {
    this.today = new Date();
    this.updateForm = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      content: new FormControl('', [
        Validators.maxLength(500)
      ])
    });
  }

  get f() { return this.updateForm.controls; }

  fillForm() {
    if (this.todoItem) {
      this.f.title.patchValue(this.todoItem.title);
      this.f.content.patchValue(this.todoItem.content || "");
    }
  }

  clickEdit() {
    this.fillForm();
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  submitUpdate() {
    if (this.updateForm.invalid) return;
    const data = this.updateForm.getRawValue();
    Object.assign(this.todoItem, data);
    this.isEditing = false;
    this.updatingEvent.emit(this.todoItem);
    this.alertService.success("Todo updated!");
  }

  removeItem() {
    if (!confirm("Are you sure you want to remove this?")) {
      return;
    }
    this.removingEvent.emit(this.todoItem.id);
    this.alertService.success("Todo removed.");
  }
}
