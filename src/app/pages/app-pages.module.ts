import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

import {UsersEditorViewComponent} from "./users-editor.component";
import {MyInputViewComponent} from "./my-input-view.component";
import {MessagesViewComponent} from "./messages-view.component";
import {AdminSettingsViewComponent} from "./admin-settings-view.component";
import {AuthenticationViewComponent} from "./authentication-view.component";
import {AboutViewComponent} from "./about-view.component";

import {MyInputModule} from "../my-input/my-input.module";
import {MyFormModule} from "../my-form/my-form.module";
import {AppSharedModule} from "../shared/app-shared.module";

/*
 * module for application pages
 */

@NgModule({
  declarations: [
    UsersEditorViewComponent,
    MyInputViewComponent,
    MessagesViewComponent,
    AdminSettingsViewComponent,
    AboutViewComponent,
    AuthenticationViewComponent
  ],
  imports: [
    // required modules from angular2 library
    CommonModule,
    FormsModule,
    HttpModule,
    // my modules in the application
    MyInputModule,
    MyFormModule,
    AppSharedModule
  ],
  exports : [
    UsersEditorViewComponent,
    MyInputViewComponent,
    MessagesViewComponent,
    AdminSettingsViewComponent,
    AboutViewComponent,
    AuthenticationViewComponent
  ],
  providers: [
  ]
})
export class AppPagesModule {

}
