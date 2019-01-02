import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoCreateComponent} from './todo-create.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TodoCreateService} from './todo-create.service';
import {of} from 'rxjs';

describe('TodoCreateComponent', () => {
  let component: TodoCreateComponent;
  let fixture: ComponentFixture<TodoCreateComponent>;
  let todoCreateService: TodoCreateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoCreateComponent],
      imports: [
        HttpClientModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCreateComponent);
    component = fixture.componentInstance;
    todoCreateService = fixture.debugElement.injector.get(TodoCreateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty text for todo on init', () => {
    component.ngOnInit();
    expect(component.todo).toBe('');
  });

  /*
  it('should be able to create a todo', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const inputEl = fixture.debugElement.query(By.css('input[name=todo]'));
    inputEl.nativeElement.value = 'Watch Game of Thrones';
    const formEl = fixture.debugElement.query(By.css('form'));
    formEl.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });
  */

  it('should be able to create a todo on submit', () => {
    spyOn(component.created, 'emit').and.callThrough();
    spyOn(todoCreateService, 'create').and.returnValue(of({}));
    component.todo = 'Watch Game of Thrones';
    component.onSubmit();
    expect(todoCreateService.create).toHaveBeenCalledWith({completed: false, title: 'Watch Game of Thrones'});
    expect(component.todo).toEqual('');
    expect(component.created.emit).toHaveBeenCalled();
  });
});
