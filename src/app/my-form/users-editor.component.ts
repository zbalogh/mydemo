import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, SelectItem } from "primeng/components/common/api";
import { MyUsersService } from "../my-form/my-users.service";
import { User } from "../my-form/user.model";
import { UserRoleItem } from "./user-role.model";


/**
 * View Component to use the components in the 'my-form' module
 */
@Component({
  selector : 'users-editor-view',
  templateUrl: './users-editor.component.html'
})
export class UsersEditorViewComponent implements OnInit, OnDestroy {

  // a flag to turn on/off routing to user editor component with angular routing mechanism
  ROUTE_TO_USER_EDITOR_FORM = true;

  // selectedUser object which is used for editing via 'my-form' component
  // as default we initialize it with NULL value
  selectedUser: User = null;

  // array for primeNG grid component where we collect the selected users
  selectedUsers: User[] = [];

  // stores the current entered search value
  searchTerm = '';

  // list of users which will be shown
  private usersList: User[];

  // queryParams subscription
  private queryParamsSubscription: any;

  // message displayed after user submit
  message: string;

  // confirm message for delete operation
  deleteConfirmMessage = "Are you sure you want to delete the selected items?";

  // flag to choose grid-panel component
  usePrimeNgDataTable = true;

  departmentList: SelectItem[];
  availableRoles: UserRoleItem[];

  /*
   * column definitions for grid-list
   */
  columns: any[] = [
    {
      id : 'userid',
      label : 'UserID'
    },
    {
      id : 'firstname',
      label : 'FirstName'
    },
    {
      id : 'lastname',
      label : 'LastName'
    },
    {
      id : 'email',
      label : 'Email'
    },
    {
      id : 'telephone',
      label : 'Telephone'
    },
    {
      id : 'mobile',
      label : 'Mobile'
    },
    {
      id : 'company',
      label : 'Company'
    },
    {
      id : 'department',
      label : 'Department'
    }
  ];


  /**
   * constructor of this component
   *
   * @param myUsersService
   */
  constructor(private router: Router, private route: ActivatedRoute,
              private myUsersService: MyUsersService,
              private confirmationService: ConfirmationService)
  {
    // initialize the usersList array
    this.usersList = [];

    this.queryParamsSubscription = this.route.queryParams.subscribe(
      params => {
        // get 'q' query parameter or empty if no parameter
        this.searchTerm = params['q'] || '';
      }
    );

    console.log('[users-editor-view] constructor finished');
  }

  ngOnInit()
  {
    console.log('[users-editor-view] finding users with search term: q=' + this.searchTerm);

    // when initializing this component then we get users from the service with the given search term
    this.findUsers(this.searchTerm);

    console.log('[users-editor-view] ngOnInit finished');
  }

  ngOnDestroy()
  {
    this.queryParamsSubscription.unsubscribe();
  }


  /**
   * bind to the template
   *
   * @returns {User[]}
   */
  get userslist(): User[]
  {
    return this.usersList;
  }

  /**
   * if user is selected then show user editor form panel
   *
   * @returns {boolean}
   */
  get showUserEditorForm(): boolean
  {
    if (this.selectedUser != null) {
      // if the 'selectedUser' is neither null nor undefined then we return true
      return true;
    }
    return false;
  }

  /**
   * if no user selected to add or edit then display search and list panels
   *
   * @returns {boolean}
   */
  get showUserSearchList(): boolean
  {
    if (this.selectedUser == null) {
      // if no 'selectedUser' then show search and list panels
      return true;
    }
    return false;
  }


  createEmptyNewUser(): User
  {
    let newUser = new User();

    // get user dependencies
    this.getUserDependencies(newUser);

    return newUser;
  }


  /**
   * get or update user dependencies
   *
   * @param user
   */
  private getUserDependencies(user: User)
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

  private getAvailableUserRoles(user: User)
  {
    // get list of available roles from the service
    this.availableRoles = this.myUsersService.getAvailableUserRoles(user);
  }


  onClickAddUser() {
    // first create a new empty user object, which will be assigned to the 'selectedUser' object
    let newUser = this.createEmptyNewUser();

    this.selectedUser = newUser;

    if (this.ROUTE_TO_USER_EDITOR_FORM) {
        // route to the user editor form to create new user (id is zero)
        this.router.navigate(['/users', '0']);
    }
  }


  /**
   * callback method to handle even received from the 'my-form' component when the selectedUser editor form has been submitted
   *
   * @param event
   */
  onMyFormSubmitted(submittedUser: User)
  {
    console.log('[users-editor-view] The my-form has been submitted: ', submittedUser);

    // update the 'selectedUser' object with values received from the 'my-form' where the selectedUser was edited

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

  handleSuccessUserCreation(newUser: User)
  {
      console.log('[users-editor-view] addUser() response OK | ', newUser);

      // get user dependencies
      this.getUserDependencies(newUser);

      // update the selectedUser reference
      this.selectedUser = newUser;

      this.message = 'New user successfully created';

      // set timeout to clear message after a few seconds
      this.activateMessageClearingTimeout();

      // TODO: maybe we can deactivate the search here, and only trigger search when close user editor form by cancel button
      // refresh the list of users by the current/actual search term
      this.findUsers(this.searchTerm);
  }

  handleSuccessUserUpdate(updatedUser: User)
  {
      console.log('[users-editor-view] updateUser() response OK | ', updatedUser);

      // get user dependencies
      this.getUserDependencies(updatedUser);

      // update the selectedUser reference
      this.selectedUser = updatedUser;

      this.message = 'User successfully updated';

      // set timeout to clear message after a few seconds
      this.activateMessageClearingTimeout();

      // TODO: maybe we can deactivate the search here, and only trigger search when close user editor form by cancel button
      // refresh the list of users by the current/actual search term
      this.findUsers(this.searchTerm);
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
    console.log('[users-editor-view] The user form has been cancelled/closed.');

    // user editor form has been cancelled/closed
    // set null to 'selectedUser' to display again the search and list panels
    this.selectedUser = null;

    // refresh the list of users by the current/actual search term
    this.findUsers(this.searchTerm);
  }

  /**
   * handler method when an user is selected for editing in the list
   *
   * @param user
   */
  onSelectedUser(user: User)
  {
    console.log('[users-editor-view] selected user: ', user);

    // get user dependencies
    this.getUserDependencies(user);

    this.selectedUser = user;

    if (this.ROUTE_TO_USER_EDITOR_FORM) {
        // route to the user editor form to edit this existing user
        this.router.navigate(['/users', user.id]);
    }
  }

  /**
   * double click event on the PrimeNG data-table component
   *
   * @param event
   */
  onRowDblclick(event)
  {
    console.log('grid click event: ', event);
    //let user : User = event.data;
    //this.onSelectedUser(user);
  }

  /**
   * handler method when an user is selected for deleting in the list
   *
   * @param user
   */
  onDeleteUser(user: User)
  {
    console.log('[users-editor-view] deleting user: ', user);

    this.myUsersService.deleteUser(user).subscribe(
        res =>  {
          console.log('[deletedUser] response OK');

          this.message = 'User successfully deleted';

          // set timeout to clear message after a few seconds
          this.activateMessageClearingTimeout();

          // refresh the list of users by the current/actual search term
          this.findUsers(this.searchTerm);
        },
        err => this.handleReceivedError(err)
    );
  }

  /**
   * handler method for PrimeNG data-table component when clicking on 'Delete Users' button
   */
  onClickDeleteSelectedUsers()
  {
    if (this.selectedUsers.length === 0) {
      // no user selected
      console.log('[users-editor-view] no user selected');
      return;
    }

    // confirm is necessary before the delete process
    this.confirmationService.confirm({
        message : this.deleteConfirmMessage,
        header : 'Delete Confirmation',
        icon : 'fa fa-trash',
        // define the callback method when confirmation is accepted
        accept: () => {
            // 'Yes' button selected
            console.log('[users-editor-view] deleting selected users: ', this.selectedUsers);

            // create an empty number array. We collect here the ID values for the selected users
            let userIDs: number[] = [];

            for (let user of this.selectedUsers) {
                // add userID into the array
                userIDs.push(user.id);
            }

            this.myUsersService.deleteSelectedUsers(userIDs).subscribe(
                res => {
                    // callback method for HTTP success response
                    console.log('[deleteSelectedUsers] response OK');

                    this.message = 'Selected users successfully deleted';

                    // set timeout to clear message after a few seconds
                    this.activateMessageClearingTimeout();

                    // refresh the list of users by the current/actual search term
                    this.findUsers(this.searchTerm);
                },
                err => {
                    // callback method for HTTP error response
                    this.handleReceivedError(err);
                }
            );
        } // end of accept callback inline function
    }); // end of confirm

  }

  /**
   * when search value entered on the search-field
   *
   * @param term
   */
  onSearchUsers(term: string)
  {
      console.log('[users-editor-view] search input value: ' + term);

      this.searchTerm = term;

      //this.usersList = this.myUsersService.findUsers(term);
      this.findUsers(this.searchTerm);
  }

  /**
   * find users by the current/actual search term
   */
  findUsers(term: string): void
  {
    this.myUsersService.findUsers(term)
      .subscribe(
          users => this.handleReceivedUsers(users),
          err => this.handleReceivedError(err)
      );
  }

  /**
   * callback function used for the subscribe in the findUsers HTTP request
   *
   * @param users
   */
  private handleReceivedUsers(users: User[])
  {
    this.usersList = users;
    console.log('[users-editor-view] received users from HTTP GET request');
  }

  private handleReceivedError(err)
  {
    console.log('[users-editor-view] error: ' + err);
  }

  /**
   * get all users without search term
   */
  getAllUsers(): void
  {
    this.findUsers('');
  }

}
