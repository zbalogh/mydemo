import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

/*
 * Import our page/view components used by navigation menu
 */
import {MessagesViewComponent} from "./messages-view.component";
import {AdminSettingsViewComponent} from "./admin-settings-view.component";
import {AuthenticationViewComponent} from "./authentication-view.component";
import {AboutViewComponent} from "./about-view.component";

import {HomeComponent} from "./app-home.component";
import {PageNotFoundComponent} from "./page-not-found.component";

/*
 * module for application pages
 */
@NgModule({
  declarations: [
    MessagesViewComponent,
    AdminSettingsViewComponent,
    AboutViewComponent,
    AuthenticationViewComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    // required modules from angular2 library
    CommonModule,
  ],
  exports : [
    MessagesViewComponent,
    AdminSettingsViewComponent,
    AboutViewComponent,
    AuthenticationViewComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  providers: [
  ]
})
export class AppPagesModule {

}
