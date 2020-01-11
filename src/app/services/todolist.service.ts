import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { TodoItem } from '../models/todo.model';
import { uuid } from 'uuidv4';
import { Marked } from 'marked-ts';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  constructor(private storage: StorageService) { }

  getList() { return this.storage.get() }

  addItem(item: TodoItem) {
    const newId = uuid();
    const formatted = Marked.parse(item.content || "");
    const newItem: TodoItem = { 
      ...item,
      id: newId,
      formattedContent: formatted 
    };
    return this.storage.post(newItem);
  }

  removeItem(id: string) {
    return this.storage.delete(id);
  }

  updateItem(item: TodoItem) {
    const formatted = Marked.parse(item.content || "");
    return this.storage.put({ 
      ...item,
      formattedContent: formatted 
    });
  }
}
