import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoCreateComponent} from './todo-create.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

describe('TodoCreateComponent', () => {
  let component: TodoCreateComponent;
  let fixture: ComponentFixture<TodoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCreateComponent ],
      imports: [ HttpClientModule,
        FormsModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty text for todo on init', () => {
    component.ngOnInit();
    expect(component.todo).toBe('');
  });
});
