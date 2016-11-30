import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {ReactiveSearchInputComponent} from "../rx-search-input/rx-search-input.component";

/*
 * the common and shared module which is used by overall in the application.
 * this shared module contains components and services which are common and reusable stuff in all other modules.
 */

@NgModule({
  declarations: [
    ReactiveSearchInputComponent
  ],
  imports: [
    // required modules from angular2 library
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    ReactiveSearchInputComponent
  ],
  providers: [
  ]
})
export class AppSharedModule {

}