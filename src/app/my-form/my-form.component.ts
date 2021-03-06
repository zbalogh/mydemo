import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from "@angular/forms";
import { SelectItem } from "primeng/components/common/api";
import { UserRoleItem } from "./user-role.model";
import { User } from "./user.model";

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('edit-user')
  user: User;

  @Input('showCancelButton')
  showCancelButton = false;

  @Input('availableRoles')
  availableRoles: UserRoleItem[];

  @Input('departmentList')
  departmentList: SelectItem[];

  @Output('submitted')
  submitted = new EventEmitter();

  @Output('cancelled')
  cancelled = new EventEmitter();

  constructor()
  {
    this.departmentList = [];
    this.availableRoles = [];
    console.log('[my-form] constructor finished');
  }

  ngOnInit() {
    console.log('[my-form] ngOnInit finished');
  }

  /**
   * handler method when the form is submitted
   */
  onSubmit(form: NgForm)
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
