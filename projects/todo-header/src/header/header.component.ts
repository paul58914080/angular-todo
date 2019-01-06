import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
  // If you do not want to have shadow DOM comment the following
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
