import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from 'src/app/models/todo.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.scss'],
})
export class TodoformComponent implements OnInit {

  @Input("item")
  todoItem: TodoItem;

  @Output("adding")
  addingEvent: EventEmitter<TodoItem>;

  @Output("updating")
  updatingEvent: EventEmitter<TodoItem>;

  todoForm: FormGroup;
  isUpdating: boolean;
  hasDueDate: boolean;

  constructor(
    private fb: FormBuilder
  ) { 
    this.addingEvent = new EventEmitter();
    this.updatingEvent = new EventEmitter();
  }

  ngOnInit() {
    this.isUpdating = !!(this.todoItem);
    this.hasDueDate = false;
    this.buildForm();
  }

  get f() { return this.todoForm.controls; }

  buildForm() {
    this.todoForm = this.fb.group({
      title: new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
      content: new FormControl('', [ Validators.maxLength(300) ]),
      dueDate: new FormControl(''),
      isCompleted: new FormControl(false)
    });

    if (this.isUpdating) {
      this.f.title.patchValue(this.todoItem.title);
      this.f.content.patchValue(this.todoItem.content || "");
      this.f.dueDate.patchValue(moment(this.todoItem.dueDate || ""));
      this.f.isCompleted.patchValue(this.todoItem.isCompleted || false);
      if (this.todoItem.dueDate) {
        this.hasDueDate = true;
      }
    }
  }

  submitItem() {
    if (this.todoForm.invalid) return;

    if (this.isUpdating) {
      this.updateItem();
    } else {
      this.addItem();
    }
  }

  addItem() {
    this.addingEvent.emit({
      id: "",
      ... this.todoForm.getRawValue(),
      dueDate: this.convertedDate()
    });
  }

  updateItem() {
    this.updatingEvent.emit({ 
      ... this.todoItem,
      ... this.todoForm.getRawValue(),
      dueDate: this.convertedDate()
    });
  }

  private convertedDate() : string {
    if (this.f.dueDate.value) {
      return moment(this.f.dueDate.value).toISOString();
    } else {
      return "";
    }
  }

}