import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {environment} from './environments/environment';
import {HeaderModule} from './header/header.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(HeaderModule)
  .catch(err => console.error(err));
