import { Injectable } from '@angular/core';
import { TodoItem } from 'src/app/models/todo.model';

const STORAGE_NAME = "todolist";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _todolist: TodoItem[];

  private _introItem: TodoItem = {
    id: "e2996b89-b2b1-4143-8039-fe8515425d1d",
    title: "Welcome to your Todo List!",
    content: "Your todo items are stored in your browser's localstorage.",
    formattedContent: "<p>Your todo items are stored in your browser&#39;s localstorage.</p>"
  }

  constructor() {
    this._todolist = JSON.parse(localStorage.getItem(STORAGE_NAME)) as TodoItem[] || [this._introItem];
    console.log(this._todolist);
  }

  get() {
    return this._todolist;
  }

  post(item: TodoItem) {
    this._todolist.push(item);
    return this.sync();
  }

  put(item: TodoItem) {
    const index = this.getIndex(item.id);
    if (index < 0) return this._todolist;
    Object.assign(this._todolist[index], item);
    return this.sync();
  }

  delete(id: string) {
    const index = this.getIndex(id);
    this._todolist.splice(index, 1);
    return this.sync();
  }

  private getIndex(id: string): number {
    return this._todolist.findIndex(x => x.id === id);
  }

  private sync() {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(this._todolist));
    return this._todolist;
  }
}
