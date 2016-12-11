import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import {TooltipModule} from 'primeng/primeng';

import {ReactiveSearchInputComponent} from "./rx-search-input/rx-search-input.component";
import {OrderByPipe} from "./pipes/orderby.pipe";
import {GridListComponent} from "./grid-list/grid-list.component";
import {ConfirmDirective} from "./directives/confirm.directive";

/*
 * the common and shared module which is used by overall in the application.
 * this shared module contains components and services which are common and reusable stuff in all other modules.
 */

@NgModule({
  declarations: [
    ReactiveSearchInputComponent,
    OrderByPipe,
    GridListComponent,
    ConfirmDirective
  ],
  imports: [
    // required modules from angular2 library
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // angular bootstrap UI
    NgbModule,
    // NgPrime UI
    ConfirmDialogModule,
    TooltipModule
  ],
  exports : [
    ReactiveSearchInputComponent,
    OrderByPipe,
    GridListComponent,
    ConfirmDirective
  ],
  providers: [
    // dependency for NgPrime ConfirmDialogModule
    ConfirmationService
  ]
})
export class AppSharedModule {

}
