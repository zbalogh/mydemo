import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "./user.model";
import {NgForm} from "@angular/forms";
import {SelectItem} from "primeng/components/common/api";

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

  // list of departments which will be used for the dropdown component
  departmentList : SelectItem[];

  // available and assigned roles which will be used for PickList component
  availableRoles : UserRoleItem[];
  assignedRoles  : UserRoleItem[];

  constructor()
  {
    // initialize department array with data
    this.departmentList = [];
    this.departmentList.push({label: 'None', value: ''});
    this.departmentList.push({label: 'Accounting', value: 'Accounting'});
    this.departmentList.push({label: 'Development', value: 'Development'});
    this.departmentList.push({label: 'Logistics', value: 'Logistics'});
    this.departmentList.push({label: 'Sales', value: 'Sales'});

    // initialize roles array
    this.assignedRoles = [];
    this.availableRoles = [];

    // add roles into the available roles
    this.availableRoles.push({ label: "Administrator", value: "administrator" });
    this.availableRoles.push({ label: "Standard User", value: "standard_user" });
    this.availableRoles.push({ label: "Restricted User", value: "restricted_user" });
    this.availableRoles.push({ label: "Guest", value: "guest" });

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

/**
 * class for user role
 */
class UserRoleItem
{
  label: string;
  value: string;
}
