/*
 * Import modules from angular libraries
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import "rxjs/Rx";

/*
 * Import our own modules
 */
import {AppRoutingModule} from "./app-routing.module";
import {AppPagesModule} from "./pages/app-pages.module";

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    // required modules from angular2 library
    BrowserModule,
    CommonModule,
    // Angular Bootstrap
    NgbModule.forRoot(),
    // my modules in the application
    AppRoutingModule,
    AppPagesModule
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
