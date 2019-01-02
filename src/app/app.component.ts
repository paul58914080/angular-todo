import {Component, ViewChild} from '@angular/core';
import {TodoViewComponent} from '../../projects/todo-view/src/lib/todo-view.component';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(TodoViewComponent) view: TodoViewComponent;

  created() {
    this.view.actionChanged(this.view.selectedAction);
  }
}
