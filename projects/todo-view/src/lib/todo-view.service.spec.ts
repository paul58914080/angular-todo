import {TestBed} from '@angular/core/testing';

import {TodoViewService} from './todo-view.service';
import {HttpClientModule} from '@angular/common/http';
import {asyncData} from '../testing';

describe('TodoViewService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let todoViewService: TodoViewService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    todoViewService = new TodoViewService(<any>httpClientSpy);
  });

  it('should be created', () => {
    expect(todoViewService).toBeTruthy();
  });

  it('should be able to get all the actionable todo\'s', () => {
    const todos = [ { completed: false, title: 'Watch Game of Thrones' } ];
    httpClientSpy.get.and.returnValue(asyncData(todos));
    todoViewService.getAllTodo().subscribe(actualResponse => expect(actualResponse).toEqual(todos, 'expected todos'));
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
