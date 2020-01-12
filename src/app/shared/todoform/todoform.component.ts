import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from 'src/app/models/todo.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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

  constructor(
    private fb: FormBuilder
  ) { 
    this.addingEvent = new EventEmitter();
    this.updatingEvent = new EventEmitter();
  }

  ngOnInit() {
    this.isUpdating = !!(this.todoItem);
    this.buildForm();
  }

  get f() { return this.todoForm.controls; }

  buildForm() {
    this.todoForm = this.fb.group({
      title: new FormControl('', [
        Validators.required, Validators.maxLength(50)
      ]),
      content: new FormControl('', [
        Validators.maxLength(300)
      ])
    });

    if (this.isUpdating) {
      this.f.title.patchValue(this.todoItem.title);
      this.f.content.patchValue(this.todoItem.content);
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
      ... this.todoForm.getRawValue()
    });
  }

  updateItem() {
    this.updatingEvent.emit({ 
      ... this.todoItem,
      ... this.todoForm.getRawValue() 
    });
  }

}