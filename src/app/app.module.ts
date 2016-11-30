/*
 * Import modules from angular libraries
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import "rxjs/Rx";

/*
 * Import our own modules
 */
import {AppRoutingModule} from "./app-routing.module";
import {AppPagesModule} from "./pages/app-pages.module";
import {AppSharedModule} from "./shared/app-shared.module";

/*
 * Import our components which will be used by this app module (root module)
 */
import { AppComponent } from './app.component';
import {HomeComponent} from "./pages/app-home.component";
import {PageNotFoundComponent} from "./pages/page-not-found.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],

  imports: [
    // required modules from angular2 library
    BrowserModule,
    CommonModule,
    // my modules in the application
    AppRoutingModule,
    AppPagesModule,
    AppSharedModule
  ],

  providers : [
  ],

  bootstrap: [AppComponent]
})
/**
 * this is our main/root module in our application, it is started up in the main.ts
 * The 'AppComponent' is the main component which will be bootstrapped and initialized for browser display
 */
export class AppModule { }
