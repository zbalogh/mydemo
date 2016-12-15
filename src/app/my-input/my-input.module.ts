import {NgModule} from "@angular/core/src/metadata/ng_module";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";

import {MyInputComponent} from "./my-input.component";
import {MyInputService} from "./my-input.service";
import {ShowNamesComponent} from "./show-names.component";

import {MyAuthenticationGuard} from "../authentication/app-auth-guard";
import {MyInputViewComponent} from "./my-input-view.component";

/**
* defines the routing only for this module.
* it is a lazy-loaded module. See the configuration in 'app-routing.module.ts' file
*/
const myInputRouting = [

  { path: '', component: MyInputViewComponent, canActivate : [MyAuthenticationGuard] }

];

@NgModule({
  declarations: [
    MyInputComponent,
    ShowNamesComponent,
    MyInputViewComponent
  ],
  imports : [
    RouterModule.forChild(myInputRouting),
    CommonModule,
    FormsModule,
    HttpModule,
    // PrimeNG UI
    AutoCompleteModule
  ],
  exports : [
    MyInputViewComponent
  ],
  providers: [
    MyInputService
  ],
})
export default class MyInputModule {}
