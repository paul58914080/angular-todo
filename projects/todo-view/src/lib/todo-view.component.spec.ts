import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoViewComponent} from './todo-view.component';
import {TodoViewService} from './todo-view.service';
import {of} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';

describe('TodoViewComponent', () => {
  let component: TodoViewComponent;
  let fixture: ComponentFixture<TodoViewComponent>;
  let todoViewService: TodoViewService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ TodoViewComponent ]
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

  it('should get the list of actionable todo list on init', () => {
    const todos = [ { completed: false, title: 'Watch Game of Thrones' } ];
    spyOn(todoViewService, 'getAllTodo').and.returnValue(of(todos));
    component.ngOnInit();
    expect(todoViewService.getAllTodo).toHaveBeenCalled();
    expect(component.todos).toBe(todos);
  });
});
