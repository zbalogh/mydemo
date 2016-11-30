import {NgModule} from "@angular/core/src/metadata/ng_module";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {MyInputComponent} from "./my-input.component";
import {MyInputService} from "./my-input.service";
import {ShowNamesComponent} from "./show-names.component";

import {MyAuthenticationGuard} from "../authentication/app-auth-guard";
import {MyInputViewComponent} from "../pages/my-input-view.component";

/**
* defines the routing only for this module
*/
export const myInputRouting = [

  { path: 'myInput', component: MyInputViewComponent, canActivate : [MyAuthenticationGuard] }

];

@NgModule({
  declarations: [
    MyInputComponent,
    ShowNamesComponent,
    MyInputViewComponent
  ],
  imports : [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports : [
    MyInputViewComponent
  ],
  providers: [
    MyInputService
  ],
})
export class MyInputModule {}
