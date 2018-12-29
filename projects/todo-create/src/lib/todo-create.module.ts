import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoCreateComponent} from './todo-create.component';
import {TodoCreateService} from './todo-create.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TodoCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TodoCreateComponent
  ],
  bootstrap: [
    TodoCreateComponent
  ],
  providers: [
    TodoCreateService
  ],
  entryComponents: [
    TodoCreateComponent
  ]
})
export class TodoCreateModule {
}
