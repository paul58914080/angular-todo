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
  selectedAction: string;
  actions: string[];

  constructor(private viewService: TodoViewService) {
  }

  ngOnInit() {
    this.actions = Object.values(Actions);
    this.selectedAction = Actions.Pending;
    this.getPendingTodo();
  }

  getPendingTodo() {
    this.viewService.getPendingTodo().subscribe((response) => {
      this.todos = response;
    });
  }

  getAllTodo() {
    this.viewService.getAllTodo().subscribe((response) => {
      this.todos = response;
    });
  }

  getCompletedTodo() {
    this.viewService.getCompletedTodo().subscribe((response) => {
      this.todos = response;
    });
  }

  actionChanged(selectedAction: string) {
    switch (selectedAction) {
      case Actions.All:
        this.selectedAction = Actions.All;
        this.getAllTodo();
        break;
      case Actions.Completed:
        this.selectedAction = Actions.Completed;
        this.getCompletedTodo();
        break;
      default:
        this.selectedAction = Actions.Pending;
        this.getPendingTodo();
    }
  }
}

enum Actions {
  All = 'All',
  Completed = 'Completed',
  Pending = 'Pending'
}

