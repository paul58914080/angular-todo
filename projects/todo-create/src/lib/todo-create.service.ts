import {Injectable} from '@angular/core';
import {Todo} from './todo';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoCreateService {

  constructor(private httpClient: HttpClient) {
  }

  create(todo: Todo): Observable<void> {
    return this.httpClient.post<void>('/todo', todo);
  }
}
