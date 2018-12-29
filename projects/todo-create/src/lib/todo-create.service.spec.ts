import {TestBed} from '@angular/core/testing';

import {TodoCreateService} from './todo-create.service';

describe('TodoCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoCreateService = TestBed.get(TodoCreateService);
    expect(service).toBeTruthy();
  });
});
