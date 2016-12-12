import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ChartModule} from 'primeng/primeng';

/*
 * pages/views which are not used as lazy loading. it loaded with app/root module
 */
import {AuthenticationViewComponent} from "./authentication-view.component";
import {AboutViewComponent} from "./about-view.component";
import {HomeComponent} from "./app-home.component";
import {PageNotFoundComponent} from "./page-not-found.component";

/*
 * module for application pages
 */
@NgModule({
  declarations: [
    AboutViewComponent,
    AuthenticationViewComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    // required modules from angular2 library
    CommonModule,
    // NgPrime UI
    ChartModule
  ],
  exports : [
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
