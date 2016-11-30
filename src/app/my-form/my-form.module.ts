import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import { MyFormComponent } from './my-form.component';
import {MyUsersListComponent} from "./my-users-list.component";
import {MyUsersService} from "./my-users.service";
import {UsersEditorViewComponent} from "../pages/users-editor.component";

import {MyAuthenticationGuard} from "../authentication/app-auth-guard";
import {AppSharedModule} from "../shared/app-shared.module";

/**
 * defines the routing only for this module
 */
export const myUsersRouting = [

  { path: 'users', component: UsersEditorViewComponent, canActivate : [MyAuthenticationGuard] }

];

@NgModule({
  declarations: [
    MyFormComponent,
    MyUsersListComponent,
    UsersEditorViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AppSharedModule
  ],
  exports : [
    UsersEditorViewComponent
  ],
  providers: [
    MyUsersService
  ]
})
export class MyFormModule { }
