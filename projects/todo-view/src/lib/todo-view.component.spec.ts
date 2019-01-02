import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoViewComponent} from './todo-view.component';
import {TodoViewService} from './todo-view.service';
import {of} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

describe('TodoViewComponent', () => {
  let component: TodoViewComponent;
  let fixture: ComponentFixture<TodoViewComponent>;
  let todoViewService: TodoViewService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        NgbDropdownModule,
        FormsModule],
      declarations: [TodoViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    todoViewService = fixture.debugElement.injector.get(TodoViewService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the list of all pending todo list on init', () => {
    const todos = [{completed: false, title: 'Watch Game of Thrones', id: 1}];
    spyOn(todoViewService, 'getPendingTodo').and.returnValue(of(todos));
    component.ngOnInit();
    expect(todoViewService.getPendingTodo).toHaveBeenCalled();
    expect(component.todos).toBe(todos);
    expect(component.actions).toEqual(['All', 'Completed', 'Pending']);
    expect(component.selectedAction).toBe('Pending');
  });

  it('should get the list of all todo list', () => {
    const todos = [{completed: false, title: 'Watch Game of Thrones', id: 1}, {
      completed: true,
      title: 'Lord of the rings',
      id: 2
    }];
    spyOn(todoViewService, 'getAllTodo').and.returnValue(of(todos));
    component.getAllTodo();
    expect(todoViewService.getAllTodo).toHaveBeenCalled();
    expect(component.todos).toBe(todos);
  });

  it('should get the list of all completed todo list', () => {
    const todos = [{completed: true, title: 'Lord of the rings', id: 1}];
    spyOn(todoViewService, 'getCompletedTodo').and.returnValue(of(todos));
    component.getCompletedTodo();
    expect(todoViewService.getCompletedTodo).toHaveBeenCalled();
    expect(component.todos).toBe(todos);
  });

  it('should get the appropriate todo list when the selected action changes', () => {
    spyOn(component, 'getCompletedTodo').and.returnValues([{completed: true, title: 'Watch Game of Thrones'}]);
    spyOn(component, 'getPendingTodo').and.returnValues([{completed: false, title: 'Watch Game of Thrones'}]);
    spyOn(component, 'getAllTodo').and.returnValues([{
      completed: false,
      title: 'Watch Game of Thrones'
    }, {completed: true, title: 'Lord of the rings'}]);

    component.actionChanged('Pending');
    expect(component.getPendingTodo).toHaveBeenCalled();

    component.actionChanged('All');
    expect(component.getAllTodo).toHaveBeenCalled();

    component.actionChanged('Completed');
    expect(component.getCompletedTodo).toHaveBeenCalled();
  });

  it('should on completion of a todo should update it as completed and refresh the current view', () => {
    component.selectedAction = 'Pending';
    spyOn(todoViewService, 'update').and.returnValue(of({}));
    spyOn(component, 'getPendingTodo').and.returnValues([{completed: false, title: 'Watch Game of Thrones'}]);
    const todo = {completed: true, title: 'Watch Game of Thrones', id: 1};
    component.completed(todo);
    expect(todoViewService.update).toHaveBeenCalledWith(todo);
    expect(component.getPendingTodo).toHaveBeenCalled();
  });
});
