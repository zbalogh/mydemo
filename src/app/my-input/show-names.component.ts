import {Component, Input} from "@angular/core";

@Component({
  selector : "show-names",
  template : `History of the entered names:
              <br><br>
              <li *ngFor="let item of namesList; let i = index;">
                {{i+1}}) {{item}}
              </li>
              <br>
             `
})
export class ShowNamesComponent {

  @Input('names')
  namesList = [];

}
