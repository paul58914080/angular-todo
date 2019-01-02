import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TodoCreateService} from './todo-create.service';

@Component({
  selector: 'todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {
  todo: string;

  @Output() created = new EventEmitter<void>();

  constructor(private todoCreateService: TodoCreateService) {
  }

  ngOnInit() {
    this.todo = '';
  }

  onSubmit() {
    this.todoCreateService.create({completed: false, title: this.todo}).subscribe(() => {
      this.created.emit();
      this.todo = '';
    });
  }
}
