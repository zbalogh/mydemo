/*
 * Import modules from angular libraries
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {CommonModule} from "@angular/common";

import "rxjs/Rx";

/*
 * Import our own modules
 */
import {AppRoutingModule} from "./app-routing.module";
import {MyInputModule} from "./my-input/my-input.module";
import {MyFormModule} from "./my-form/my-form.module";

/*
 * Import our components which will be used by this app module (root module)
 */
import { AppComponent } from './app.component';
import {UsersEditorViewComponent} from "./pages/users-editor.component";
import {MyInputViewComponent} from "./pages/my-input-view.component";
import {HomeComponent} from "./pages/app-home.component";
import {PageNotFoundComponent} from "./pages/page-not-found.component";
import {MessagesViewComponent} from "./pages/messages-view.component";
import {AdminSettingsViewComponent} from "./pages/admin-settings-view.component";
import {ReactiveSearchInputComponent} from "./rx-search-input/rx-search-input.component";
import {AboutViewComponent} from "./pages/about-view.component";
import {AuthenticationViewComponent} from "./pages/authentication-view.component";


@NgModule({
  declarations: [
    AppComponent,
    ReactiveSearchInputComponent,
    HomeComponent,
    PageNotFoundComponent,
    UsersEditorViewComponent,
    MyInputViewComponent,
    MessagesViewComponent,
    AdminSettingsViewComponent,
    AboutViewComponent,
    AuthenticationViewComponent
  ],

  imports: [
    // required modules from angular2 library
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // my modules in the application
    AppRoutingModule,
    MyInputModule,
    MyFormModule
  ],

  providers : [],

  bootstrap: [AppComponent]
})
/**
 * this is our main/root module in our application, it is started up in the main.ts
 * The 'AppComponent' is the main component which will be bootstrapped and initialized for browser display
 */
export class AppModule { }
