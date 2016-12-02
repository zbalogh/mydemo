import {Component, OnInit} from "@angular/core";
import {MyUsersService} from "../my-form/my-users.service";
import {User} from "../my-form/user.model";

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
            <search-input placeholder="Search for users" (onSearchEvent)="onSearchUsers($event)"></search-input>
      </div>
      <br>
      
      <div class="row col-sm-12">
        <my-users-list [users]="userslist" (selectedUser)="onSelectedUser($event)" (deleteUser)="onDeleteUser($event)"></my-users-list>
      </div>
      <br>
    
      <button name="addUserBtn" class="btn btn-success" (click)="onClickAddUser()">Add New User</button>
    
      <div *ngIf="showUserEditorForm">
          <my-form [edit-user]="selectedUser" (submitted)="onMyFormSubmitted($event)"></my-form>
      </div>
    </div>
`
})
export class UsersEditorViewComponent implements OnInit {

  myFormHidden: boolean = false;

  showMyFormBtnVisible: boolean = false;

  // selectedUser object which is used for editing via 'my-form' component
  // as default we initialize it with NULL value
  selectedUser : User = null;

  // stores the current entered search value
  private searchTerm : string = '';

  // list of users which will be shown
  private usersList : User[];


  /**
   * constructor of this component
   *
   * @param myUsersService
   */
  constructor(private myUsersService : MyUsersService)
  {
    // initialize the usersList array
    this.usersList = [];

    console.log('[users-editor-view] constructor finished');
  }

  ngOnInit()
  {
    // when initializing this component then we get all users from the service
    this.getAllUsers();

    console.log('[users-editor-view] ngOnInit finished');
  }


  /**
   * bind to the template
   *
   * @returns {User[]}
   */
  get userslist() : User[]
  {
    //return this.myUsersService.findUsers(this.searchTerm);
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

  onClickAddUser()
  {
    // first create a new empty user object, which will be assigned to the 'selectedUser' object
    let newUser = this.createEmptyNewUser();

    this.selectedUser = newUser;
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
