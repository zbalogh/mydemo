import {Component} from "@angular/core";

/**
 * View Component to use the components in the 'my-input' module
 */
@Component({
  selector : 'my-input-view',

  template : `
    <div align="center">
    
        <div [hidden]="!showMyInputBtnVisible">
          <button name="showMyInputBtn" class="btn btn-warning" (click)="onClickShowMyInput()">Show/Hide MyInput</button>
        </div>
        
        <div [hidden]="myInputHidden">
          <my-input initialValue="Zoltan Balogh" [buttonLabel]="getButtonLabel()" (enteredName)="onEnteredName($event)"></my-input>
        
          <div *ngIf=" enteredName != '' ">
            Your last entered name: {{enteredName}}
            <br>
          </div>
        </div>
        
    </div>
`
})
export class MyInputViewComponent {

  // hidden control flags
  myInputHidden: boolean = false;

  showMyInputBtnVisible: boolean = false;

  // label for the button in the my-input component
  // this will be passed as input parameter to the my-input component
  buttonLabel = 'Add';

  // this stores the entered name which received via an event from the my-input component
  enteredName = '';


  /**
   * return the button label
   *
   * @returns {string}
   */
  getButtonLabel() {
    return this.buttonLabel;
  }

  /**
   * * toogle function to show/hidden the my-input component
   */
  onClickShowMyInput()
  {
    this.myInputHidden = !this.myInputHidden;
  }

  /**
   * callback method to handle an event when a name entered in the my-input component
   *
   * @param event
   */
  onEnteredName(event)
  {
    console.log('[my-input-view] Received the entered name: ' + event);
    // update the local variable in this component, and then template will be updated as well
    this.enteredName = event;
  }

}
