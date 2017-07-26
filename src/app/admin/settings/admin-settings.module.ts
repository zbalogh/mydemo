import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {TabViewModule} from 'primeng/primeng';

import {AppSharedModule} from "../../shared/app-shared.module";

import {MyAuthenticationGuard} from "../../authentication/app-auth-guard";

import {AdminSettingsViewComponent} from "./admin-settings-view.component";

/**
 * defines the routing only for this module.
 * it is a lazy-loaded module. See the configuration in 'app-routing.module.ts' file
 */
const adminSettingsRouting = [

  { path: '', component: AdminSettingsViewComponent, canActivate : [MyAuthenticationGuard] }

];

@NgModule({
  declarations: [
    AdminSettingsViewComponent
  ],
  imports: [
    RouterModule.forChild(adminSettingsRouting),
    CommonModule,
    FormsModule,
    HttpModule,
    TabViewModule,
    AppSharedModule
  ],
  exports: [
    AdminSettingsViewComponent
  ],
  providers: [

  ]
})
export class AdminSettingsModule {

}
