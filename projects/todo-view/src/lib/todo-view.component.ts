import {Component, OnInit} from '@angular/core';
import {TodoViewService} from './todo-view.service';
import {Todo} from './todo';

@Component({
  selector: 'todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: [ './todo-view.component.scss' ]
})
export class TodoViewComponent implements OnInit {
  todos: Todo[];

  constructor(private viewService: TodoViewService) {
  }

  ngOnInit() {
    this.viewService.getAllTodo().subscribe((response) => {
      this.todos = response;
    });
  }
}
