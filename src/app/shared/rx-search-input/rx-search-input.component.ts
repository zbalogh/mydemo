import {Component, EventEmitter, Output, OnInit, Input} from "@angular/core";
import {FormControl} from "@angular/forms";

/**
 * Reusable component for a reactive search input field
 *
 * author: zbalogh
 */
@Component({
  selector : 'search-input',

  template : `<input type="text" class="form-control" [formControl]="searchControl" #searchInput (keyup.enter)="sendOnSearchEvent(searchInput.value)" placeholder="{{placeholder}}" />`
})
export class ReactiveSearchInputComponent implements OnInit {

  @Input('placeholder')
  private placeholder : string = 'Enter your search term';

  @Input('initialValue')
  private initialValue : string = '';

  // our own control to use input field as observable with rxJS
  private searchControl : FormControl = new FormControl('');

  @Output('onSearchEvent')
  private onSearchEvent : EventEmitter<String> = new EventEmitter<String>();

  /**
   * constructor
   */
  constructor() {
  }

  ngOnInit()
  {
    // set initial value for the input field by reset method
    this.searchControl.reset(this.initialValue);

    // use our own search control as observable to get entered search value
    // subscribe to search input field to get entered value
    this.searchControl
      .valueChanges
      .debounceTime(200)
      .subscribe((value) => this.sendOnSearchEvent(value) );
  }

  /**
   * notify parent component then about the entered search term
   *
   * @param searchTerm
   */
  private sendOnSearchEvent(searchTerm : string)
  {
      // send event with the current search term
      this.onSearchEvent.emit(searchTerm);
  }
}
