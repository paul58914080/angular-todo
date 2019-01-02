import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HeaderModule} from '../../projects/todo-header/src/header/header.module';
import {TodoViewModule} from '../../projects/todo-view/src/lib/todo-view.module';
import {TodoCreateModule} from '../../projects/todo-create/src/lib/todo-create.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call view when a new item is created', () => {
    component.view.selectedAction = 'Pending';
    spyOn(component.view, 'actionChanged').and.callThrough();
    component.created();
    expect(component.view.actionChanged).toHaveBeenCalledWith('Pending');
  });
});
