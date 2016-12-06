import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "./user.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

  @Input('edit-user')
  user : User;

  @Input('showCancelButton')
  showCancelButton : boolean = false;

  @Output('submitted')
  submitted = new EventEmitter();

  @Output('cancelled')
  cancelled = new EventEmitter();

  constructor() {
    console.log('[my-form] constructor finished');
  }

  ngOnInit() {
    console.log('[my-form] ngOnInit finished');
  }

  /**
   * handler method when the form is submitted
   */
  onSubmit(form : NgForm)
  {
    console.log("[my-form] form has been submitted. form values: ", form.value);

    // set selectedUser properties from the form input values
    this.user.userid = form.value.userid;
    this.user.firstname = form.value.firstname;
    this.user.lastname = form.value.lastname;
    this.user.email = form.value.email;
    this.user.telephone = form.value.telephone;
    this.user.mobile = form.value.mobile;
    this.user.company = form.value.company;
    this.user.department = form.value.department;

    // send an event to inform the listening parent component that form has been submitted
    this.submitted.emit(this.user);
  }

  onCancel()
  {
    this.cancelled.emit(true);
  }

}
