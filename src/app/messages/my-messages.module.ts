import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";

import {AppSharedModule} from "../shared/app-shared.module";

import {MyAuthenticationGuard} from "../authentication/app-auth-guard";
import {MyMessagesService} from "./my-messages.service";

import {MessagesViewComponent} from "./messages-view.component";

/**
 * defines the routing only for this module.
 * it is a lazy-loaded module. See the configuration in 'app-routing.module.ts' file
 */
const myMessagesRouting = [

  { path: '', component: MessagesViewComponent, canActivate : [MyAuthenticationGuard] }

];

/**
 * module for 'messages'
 */
@NgModule({
  declarations: [
    MessagesViewComponent
  ],
  imports: [
    RouterModule.forChild(myMessagesRouting),
    CommonModule,
    FormsModule,
    HttpModule,
    AppSharedModule
  ],
  exports: [
    MessagesViewComponent
  ],
  providers: [
    MyMessagesService
  ]
})
export default class MyMessagesModule {

}
