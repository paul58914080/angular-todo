import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: [ './todo-create.component.scss' ]
})
export class TodoCreateComponent implements OnInit {
  todo: string;

  @Output() created = new EventEmitter<>();

  constructor() {
  }

  ngOnInit() {
    this.todo = '';
  }

  onSubmit() {
    // TODO: call service to save
    /*
    TODO: on success
            -> emit the event
            -> clean the model
    */
  }
}
