import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFormComponent } from './my-form.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MyUsersListComponent} from "./my-users-list.component";
import {MyUsersService} from "./my-users.service";
import {UsersEditorViewComponent} from "../pages/users-editor.component";
import {MyAuthenticationGuard} from "../authentication/app-auth-guard";

/**
 * defines the routing only for this module
 */
export const myUsersRouting = [

  { path: 'users', component: UsersEditorViewComponent, canActivate : [MyAuthenticationGuard] }

];

@NgModule({
  declarations: [
    MyFormComponent,
    MyUsersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports : [
    MyFormComponent,
    MyUsersListComponent
  ],
  providers: [
    MyUsersService
  ]
})
export class MyFormModule { }