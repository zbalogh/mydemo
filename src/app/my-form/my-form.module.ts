import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {MyFormComponent} from "./my-form.component";
import {MyUsersListComponent} from "./my-users-list.component";
import {MyUsersService} from "./my-users.service";
import {UsersEditorViewComponent} from "./users-editor.component";
import {UserEditorFormComponent} from "./user-editor-form.component";
import {MyAuthenticationGuard} from "../authentication/app-auth-guard";
import {AppSharedModule} from "../shared/app-shared.module";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {DropdownModule} from 'primeng/primeng';
import {PickListModule} from 'primeng/primeng';

/**
 * defines the routing only for this module.
 * it is a lazy-loaded module. See the configuration in 'app-routing.module.ts' file
 *
 * All path are relative to the path defined in the app routing module: '/users'
 */
const myUsersRouting = [

  { path: '', component: UsersEditorViewComponent, canActivate : [MyAuthenticationGuard] },

  { path: ':id', component: UserEditorFormComponent, canActivate : [MyAuthenticationGuard] }

];

@NgModule({
  declarations: [
    MyFormComponent,
    MyUsersListComponent,
    UsersEditorViewComponent,
    UserEditorFormComponent
  ],
  imports: [
    RouterModule.forChild(myUsersRouting),
    CommonModule,
    FormsModule,
    HttpModule,
    // Angular Bootstrap UI
    NgbModule,
    // NgPrime UI
    DropdownModule,
    PickListModule,
    // our own shared module
    AppSharedModule
  ],
  exports : [
    UsersEditorViewComponent
  ],
  providers: [
    MyUsersService
  ]
})
export default class MyFormModule { }
