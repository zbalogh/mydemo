import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {HomeComponent} from "./pages/app-home.component";
import {PageNotFoundComponent} from "./pages/page-not-found.component";
import {MessagesViewComponent} from "./pages/messages-view.component";
import {AdminSettingsViewComponent} from "./pages/admin-settings-view.component";
import {AboutViewComponent} from "./pages/about-view.component";
import {AuthenticationViewComponent} from "./pages/authentication-view.component";

import {MyAuthenticationGuard} from "./authentication/app-auth-guard";
import {MyAuthenticationService} from "./authentication/app-auth.service";

/**
 * defines the application routing which is used by RouterModule
 */
export const appRoutes: Routes = [

  // lazy-loaded module
  {
    path: 'users',
    loadChildren: './my-form/my-form.module'
  },

  // lazy loaded module
  {
    path: 'myInput',
    loadChildren: './my-input/my-input.module'
  },

  { path: 'messages', component: MessagesViewComponent, canActivate : [MyAuthenticationGuard] },

  { path: 'admin/settings', component: AdminSettingsViewComponent, canActivate : [MyAuthenticationGuard] },

  { path: 'about', component: AboutViewComponent },

  { path: 'authentication', component: AuthenticationViewComponent },

  // home component the default when open browser without path
  { path: '', component: HomeComponent },

  // last route entry for case when no matching, then we display 'page not found' component
  { path: '**', component: PageNotFoundComponent }

];


/**
 * Application Routing Configuration
 */
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MyAuthenticationGuard,
    MyAuthenticationService
  ]
})
export class AppRoutingModule {

}
