import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    HeaderComponent
  ],
  bootstrap: [
    HeaderComponent
  ]
})
export class HeaderModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const headerElement = createCustomElement(HeaderComponent, {injector: this.injector});
    customElements.define('todo-header', headerElement);
  }
}
