import {Component, Output, Input, EventEmitter} from "@angular/core";
import {MyInputService} from "./my-input.service";

@Component({
  selector : 'my-input',
  template : `<h2>My First Input Component</h2>
              
              <input [hidden]="true" name="name" placeholder="Enter a name..." value="{{value}}" #input (keydown.enter)="onProcessInput(input)" />
              
              <p-autoComplete placeholder="Enter a name..." [(ngModel)]="autoCompleteText" [suggestions]="filteredSuggestions" (completeMethod)="filterSuggestions($event)" (keydown.enter)="onProcessAutoCompleteInput()"></p-autoComplete>
              
              <button name="addBtn" class="btn btn-success" (click)="onProcessAutoCompleteInput()">{{buttonLabel}}</button>
              <button name="clearBtn" class="btn btn-success" (click)="onClear()">Clear</button>
              <br><br>
              
              <show-names [names]="getNamesList"></show-names>
  `
})
export class MyInputComponent {

  // dependency injection for MyInputService
  constructor(private myInputService : MyInputService) {
  }

  //internal component variable to store the entered value from the input field which defined in the template
  // annotated with @Input in order to get input parameter from the template where this component is being used.
  // the input parameters need to be used as template syntax property.
  @Input('initialValue')
  value = '';

  // read input parameter for button label, if presented then parameter value is used otherwise the 'Submit'
  @Input('buttonLabel')
  buttonLabel = 'Submit';

  // output parameter to inform the parent component about the entered name in the input field
  @Output('enteredName')
  enteredNameEvent = new EventEmitter();

  // variable where the auto complete input field will write the value
  autoCompleteText : string = '';

  // filtered suggestion by the entered text, this will be suggested by the auto-complete field
  filteredSuggestions = [];


  /**
   * Handler method to process the normal input field when enter or click event happens
   *
   * @param input
   */
  onProcessInput(input)
  {
      console.log('[input-field] You entered in the input field: ' + input.value);

      this.handleEnteredValue(input.value);
  }

  /**
   * Handler method to process the auto-complete input field when enter or click event happens
   */
  onProcessAutoCompleteInput()
  {
      console.log('[auto-complete] You entered in the auto-complete field: ' + this.autoCompleteText);

    this.handleEnteredValue(this.autoCompleteText);

    // clear auto-complete field
    this.autoCompleteText = '';
  }

  /**
   * Handler method to save the entered value, and emit an event to the parent component
   *
   * @param value
   */
  handleEnteredValue(value : string)
  {
      if (value === '') {
        alert("Empty is not allowed. Enter something.");
      }
      else {
        // save the entered name
        this.saveName(value);

        // we have a non-empty value, let's emmit it as output to the parent component who uses this component in his template
        this.enteredNameEvent.emit(value);
      }
  }

  /**
   * Clear the history of entered names
   */
  onClear()
  {
    this.myInputService.removeNames();
  }

  /**
   * save the given name
   *
   * @param value
   */
  saveName(value)
  {
    this.myInputService.save(value);
  }

  /**
   * return the list of names which are stored in the service
   *
   * @returns {Array}
   */
  get getNamesList()
  {
    return this.myInputService.getNames();
  }

  filterSuggestions(event)
  {
    console.log('search value: ' + event.query);

    let filter = event.query;

    this.filteredSuggestions = this.myInputService.filterNameSuggestions(filter);
  }

}
