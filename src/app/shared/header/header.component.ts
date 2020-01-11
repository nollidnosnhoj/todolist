import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  // templateUrl: './header.component.html',
  // styleUrls: ['./header.component.scss'],
  template: `
<header class="todolist-header">
  <mat-toolbar color="primary">
    <mat-toolbar-row>
      <span>{{ siteName }}</span>
      <span class="header-spacer"></span>
      <mat-icon class="add-todo-icon" aria-hidden="false" aria-label="Add Todo">edit</mat-icon>
    </mat-toolbar-row>
  </mat-toolbar>
</header>
  `,
  styles: [
    `.todolist-header { margin-bottom: 2rem; }`,
    `.header-spacer { flex: 1 1 auto; }`
  ]
})
export class HeaderComponent implements OnInit {

  siteName = "todolist";

  constructor() { }

  ngOnInit() {
  }

}
