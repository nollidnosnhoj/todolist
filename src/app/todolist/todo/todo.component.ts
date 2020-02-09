import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TodoItem } from 'src/app/models/todo.model';
import { AlertService } from 'src/app/services/alert.service';

import * as moment from 'moment';

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
    private alertService: AlertService
  ) { 
    this.updatingEvent = new EventEmitter();
    this.removingEvent = new EventEmitter();
  }

  ngOnInit() {
    this.today = new Date();
    this.recalculateHumanDate();
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
    this.recalculateHumanDate();
    this.alertService.success("Todo updated!");
  }

  removeItem() {
    if (!confirm("Are you sure you want to remove this?")) {
      return;
    }
    this.removingEvent.emit(this.todoItem.id);
    this.alertService.success("Todo removed.");
  }

  private recalculateHumanDate() {
    if (this.todoItem.isCompleted) {
      this.humanDate = "Completed."
    }
    else if (this.todoItem.dueDate) {
      const relative = moment(this.todoItem.dueDate).from(this.today);
      this.humanDate = `Due ${relative}`;
    } else {
      this.humanDate = "";
    }
  }
}
