import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

/*
 * AppModule is our main/root module which will be bootstrapped by Angular2 framework
 */
platformBrowserDynamic().bootstrapModule(AppModule);
