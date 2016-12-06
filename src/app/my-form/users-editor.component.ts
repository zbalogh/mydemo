import {Component, OnInit, OnDestroy} from "@angular/core";
import {MyUsersService} from "../my-form/my-users.service";
import {User} from "../my-form/user.model";
import {ActivatedRoute, Router} from "@angular/router";

/**
 * View Component to use the components in the 'my-form' module
 */
@Component({
  selector : 'users-editor-view',

  template : `
    <div [hidden]="!showMyFormBtnVisible">
        <button name="showMyFormBtn" class="btn btn-warning" (click)="onClickShowMyForm()">Show/Hide MyForm</button>
    </div>

    <div [hidden]="myFormHidden">
      <div class="row col-sm-2">
            <search-input placeholder="Search for users" [initialValue]="searchTerm" (onSearchEvent)="onSearchUsers($event)"></search-input>
      </div>
      <br><br>
      
      <div class="row col-sm-12">
        <grid-list [columns]="columns"
                   [data]="userslist"
                   [orderByColumns]="['+userid']"
                   [showSelectButton]="true"
                   [showDeleteButton]="true"
                   (selectItem)="onSelectedUser($event)"
                   (deleteItem)="onDeleteUser($event)">
        </grid-list>
      </div>
      <br>
    
      <button name="addUserBtn" class="btn btn-success" (click)="onClickAddUser()">Add New User</button>
    
      <div *ngIf="showUserEditorForm">
          <my-form [edit-user]="selectedUser" (submitted)="onMyFormSubmitted($event)"></my-form>
      </div>
    </div>
`
})
export class UsersEditorViewComponent implements OnInit, OnDestroy {

  ROUTE_TO_USER_EDITOR_FORM : boolean = true;

  myFormHidden: boolean = false;

  showMyFormBtnVisible: boolean = false;

  // selectedUser object which is used for editing via 'my-form' component
  // as default we initialize it with NULL value
  selectedUser : User = null;

  // stores the current entered search value
  private searchTerm : string = '';

  // list of users which will be shown
  private usersList : User[];

  // queryParams subscription
  private queryParamsSubscription : any;

  /*
   * column definitions for grid-list
   */
  columns : any[] = [
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
  constructor(private router: Router, private route: ActivatedRoute, private myUsersService : MyUsersService)
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
  get userslist() : User[]
  {
    return this.usersList;
  }

  get showUserEditorForm() : boolean
  {
    if (this.selectedUser != null) {
      // if the 'selectedUser' is neither null nor undefined then we return true
      return true;
    }
    return false;
  }

  createEmptyNewUser() : User
  {
    let newUser = new User();

    return newUser;
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
   * toogle function to show/hidden the my-form component
   */
  onClickShowMyForm()
  {
    this.myFormHidden = !this.myFormHidden;
  }

  /**
   * callback method to handle even received from the 'my-form' component when the selectedUser editor form has been submitted
   *
   * @param event
   */
  onMyFormSubmitted(submittedUser : User)
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

      // refresh the list of users by the current/actual search term
      this.findUsers(this.searchTerm);
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
      console.log('[users-editor-view] addUser() response OK | ', newUser);

      // update the selectedUser reference
      this.selectedUser = newUser;

      // refresh the list of users by the current/actual search term
      this.findUsers(this.searchTerm);
  }

  handleSuccessUserUpdate(updatedUser : User)
  {
      console.log('[users-editor-view] updateUser() response OK | ', updatedUser);

      // update the selectedUser reference
      this.selectedUser = updatedUser;

      // refresh the list of users by the current/actual search term
      this.findUsers(this.searchTerm);
  }

  /**
   * handler method when an user is selected for editing in the list
   *
   * @param user
   */
  onSelectedUser(user : User)
  {
    console.log('[users-editor-view] selected user: ', user);

    this.selectedUser = user;

    if (this.ROUTE_TO_USER_EDITOR_FORM) {
        // route to the user editor form to edit this existing user
        this.router.navigate(['/users', user.id]);
    }
  }

  /**
   * handler method when an user is selected for deleting in the list
   *
   * @param user
   */
  onDeleteUser(user : User)
  {
    console.log('[users-editor-view] deleting user: ', user);

    this.myUsersService.deleteUser(user).subscribe(
        res =>  console.log('[deletedUser] response OK'),
        err => this.handleReceivedError(err)
    );

    // finally, to be sure we set the 'selectedUser' to null in order to close the editor...
    this.selectedUser = null;

    // refresh the list of users by the current/actual search term
    this.findUsers(this.searchTerm);
  }

  /**
   * when search value entered on the search-field
   *
   * @param term
   */
  onSearchUsers(term : string)
  {
      console.log('[users-editor-view] search input value: ' + term);

      this.searchTerm = term;

      //this.usersList = this.myUsersService.findUsers(term);
      this.findUsers(this.searchTerm);
  }

  /**
   * find users by the current/actual search term
   */
  findUsers(term : string) : void
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
  getAllUsers() : void
  {
    this.findUsers('');
  }

}
