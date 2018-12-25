import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from '../../projects/todo-header/src/header/header.module';
import {TodoViewModule} from '../../projects/todo-view/src/lib/todo-view.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    TodoViewModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
