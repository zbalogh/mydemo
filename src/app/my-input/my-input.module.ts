import {NgModule} from "@angular/core/src/metadata/ng_module";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {MyInputComponent} from "./my-input.component";
import {MyInputService} from "./my-input.service";
import {ShowNamesComponent} from "./show-names.component";
import {MyInputViewComponent} from "./my-input-view.component";

import {MyAuthenticationGuard} from "../authentication/app-auth-guard";


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
    // Angular Bootstrap UI
    NgbModule,
    // Angular Modal Bootstrap Module
    BootstrapModalModule,
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
