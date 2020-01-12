import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { TodoItem } from 'src/app/models/todo.model';
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

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService
  ) { 
    this.updatingEvent = new EventEmitter();
    this.removingEvent = new EventEmitter();
  }

  ngOnInit() {
    this.today = new Date();
  }

  clickEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  updateItem(item: TodoItem) {
    this.isEditing = false;
    this.updatingEvent.emit(item);
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
