import {OnDestroy, OnInit, Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {MyUsersService} from "./my-users.service";
import {User} from "./user.model";
import {SelectItem} from "primeng/components/common/api";
import {UserRoleItem} from "./user-role.model";

@Component({
  selector : 'user-editor',

  template : `
            <ngb-alert *ngIf="message" type="success" [dismissible]="false">{{ message }}</ngb-alert>
            
            <my-form [edit-user]="editingUser" [showCancelButton]="true" [departmentList]="departmentList" [availableRoles]="availableRoles" (submitted)="onMyFormSubmitted($event)" (cancelled)="onMyFormCancelled($event)"></my-form>
            
            <br>
`
})
/**
 * this component is used to add or update user, The component is called via direct route parameters, like: " /users/:id"
 */
export class UserEditorFormComponent implements OnInit, OnDestroy {

  // editingUser object which is used for editing via 'my-form' component
  editingUser : User;

  // subscription for route parameters observable
  routeParamSub : any;

  // message displayed after user submit
  message : string;

  departmentList : SelectItem[];
  availableRoles : UserRoleItem[];

  /**
   * constructor of this component
   *
   * @param myUsersService
   */
  constructor(private router: Router, private route: ActivatedRoute, private myUsersService : MyUsersService)
  {
    // initialize with empty user object
    this.editingUser = new User();

    console.log('[user-editor-form] constructor finished');
  }

  ngOnInit()
  {
    this.routeParamSub = this.route.params.subscribe(
        params => {
            // get 'id' parameter value from the route parameters
            let id : number = +params['id'] || 0;

            if (id > 0) {
              // get user via REST service
              this.getUserById(id);
            }
            else {
              // id is zero. it is a new user creation
              console.log('[user-editor-form] id parameter value is zero. This is the new user creation.');

              // create and init a new user object with his dependencies
              this.initNewUser();
            }
        }
    );
    console.log('[user-editor-form] ngOnInit finished');
  }

  ngOnDestroy()
  {
    // unsubscribe from route parameters observable
    this.routeParamSub.unsubscribe();
  }

  /**
   * Get user via REST service with the given id
   *
   * @param id
   */
  getUserById(id : number)
  {
      this.myUsersService.getUserById(id).subscribe(
          user => {
            // received user object from REST request
            //
            // get user dependencies
            this.getUserDependencies(user);

            // set the 'editingUser' variable
            this.editingUser = user;

            console.log('[user-editor-form] received user from REST service by id=' + id);
          }
      );
  }

  /**
   * if open this form as "add new user" then we create a new user object
   */
  initNewUser()
  {
    // create a new instance of User object
    let user = new User();

    // get user dependencies
    this.getUserDependencies(user);

    // set the 'editingUser' variable
    this.editingUser = user;
  }

  /**
   * get or update user dependencies
   *
   * @param user
   */
  private getUserDependencies(user : User)
  {
    // get list of all departments which will be shown in the dropdown
    this.getDepartmentList();

    // get list of available roles depends on user already assigned roles
    this.getAvailableUserRoles(user);
  }

  private getDepartmentList()
  {
    // get list of departments from the service
   this.departmentList = this.myUsersService.getDepartmentList();
  }

  private getAvailableUserRoles(user : User)
  {
    // get list of available roles from the service
    this.availableRoles = this.myUsersService.getAvailableUserRoles(user);
  }


  /**
   * callback method to handle even received from the 'my-form' component when the editingUser editor form has been submitted
   *
   * @param event
   */
  onMyFormSubmitted(submittedUser : User)
  {
      console.log('[user-editor-form] The user form has been submitted: ', submittedUser);

      // update the 'editingUser' object with values received from the 'my-form' where the editingUser was edited

      if (submittedUser.id > 0) {
        // update existing user
        this.myUsersService.updateUser(submittedUser).subscribe(
          updatedUser => {
            this.handleSuccessUserUpdate(updatedUser)
          },
          err => this.handleReceivedError(err)
        );
      }
      else {
        // add new user
        this.myUsersService.addUser(submittedUser).subscribe(
          newUser => {
            this.handleSuccessUserCreation(newUser)
          },
          err => this.handleReceivedError(err)
        );
      }
  }

  handleSuccessUserCreation(newUser : User)
  {
      console.log('[user-editor-form] addUser() response OK | ', newUser);

      this.getUserDependencies(newUser);

      // update the editingUser reference
      this.editingUser = newUser;

      this.message = 'New user successfully created';

      // set timeout to clear message after a few seconds
      this.activateMessageClearingTimeout();
  }

  handleSuccessUserUpdate(updatedUser : User)
  {
      console.log('[user-editor-form] updateUser() response OK | ', updatedUser);

      this.getUserDependencies(updatedUser);

      // update the editingUser reference
      this.editingUser = updatedUser;

      this.message = 'User successfully updated';

      // set timeout to clear message after a few seconds
      this.activateMessageClearingTimeout();
  }

  handleReceivedError(err)
  {
      console.log('[user-editor-form] error: ' + err);
  }

  /**
   * clear message after a few seconds
   */
  activateMessageClearingTimeout()
  {
      // set timeout to clear message after a few seconds
      setTimeout(function() {
          this.message = '';
      }.bind(this), 3000);
  }

  /**
   * Cancel button clicked. We received event from the form component
   *
   * @param event
   */
  onMyFormCancelled(event)
  {
      console.log('[user-editor-form] The user form has been cancelled.');

      this.router.navigate(['/users']);
  }

}
