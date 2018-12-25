import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoViewService {

  constructor(private httpClient: HttpClient) {
  }

  getAllTodo(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('/todo');
  }
}
