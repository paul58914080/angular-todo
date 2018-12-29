import {TestBed} from '@angular/core/testing';

import {TodoCreateService} from './todo-create.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Todo} from './todo';

describe('TodoCreateService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let todoCreateService: TodoCreateService;
  let httpMock: HttpTestingController;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
  );

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    todoCreateService = TestBed.get(TodoCreateService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(todoCreateService).toBeTruthy();
  });

  it('should save the todo', () => {
    const todo: Todo = {completed: false, title: 'Watch Game of Thrones'};
    todoCreateService.create(todo).subscribe();
    const req = httpMock.expectOne(`/todo`, 'call to api for saving todo');
    expect(req.request.method).toBe('POST');
    req.flush({});
    httpMock.verify();
  });
});
