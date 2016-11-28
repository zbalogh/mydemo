import {NgModule} from "@angular/core/src/metadata/ng_module";
import {MyInputComponent} from "./my-input.component";
import {CommonModule} from "@angular/common";
import {MyInputService} from "./my-input.service";
import {ShowNamesComponent} from "./show-names.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    MyInputComponent,
    ShowNamesComponent
  ],
  imports : [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports : [
    MyInputComponent
  ],
  providers: [
    MyInputService
  ],
})
export class MyInputModule {}
