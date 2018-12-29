import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HeaderModule} from '../../projects/todo-header/src/header/header.module';
import {TodoViewModule} from '../../projects/todo-view/src/lib/todo-view.module';
import {TodoCreateModule} from '../../projects/todo-create/src/lib/todo-create.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HeaderModule,
        TodoViewModule,
        TodoCreateModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
