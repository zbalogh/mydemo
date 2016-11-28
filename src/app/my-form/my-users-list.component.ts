import {Component, Input, EventEmitter, Output, OnInit} from "@angular/core";
import {User} from "./user.model";

@Component({
    selector : 'my-users-list',
    template : `
          <h2>My Users List Component</h2>
          
          <table class="table table-hover table-bordered table-striped">
              <thead>
                  <tr>
                      <th>UserID</th>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>Email</th>
                      <th>Telephone</th>
                      <th>Mobile</th>
                      <th>Company</th>
                      <th>Department</th>
                      <th>&nbsp;</th>
                  </tr>
              </thead>
              
              <tbody>
                  <tr *ngFor="let user of userslist">
                      <td>{{user.userid}}</td>
                      <td>{{user.firstname}}</td>
                      <td>{{user.lastname}}</td>
                      <td>{{user.email}}</td>
                      <td>{{user.telephone}}</td>
                      <td>{{user.mobile}}</td>
                      <td>{{user.company}}</td>
                      <td>{{user.department}}</td>
                      <td nowrap>
                          <div class="btn btn-link" (click)="onSelectClicked(user)"><b>Select</b></div>
                          &nbsp;|&nbsp;
                          <div class="btn btn-link" (click)="onDeleteClicked(user)"><b>Delete</b></div>
                       </td>
                  </tr>
              </tbody>
          </table>
`
})
export class MyUsersListComponent implements OnInit {

  @Input('users')
  userslist : User[];

  @Output('selectedUser')
  selectedUserEvent : EventEmitter<User> = new EventEmitter<User>();

  @Output('deleteUser')
  deleteUserEvent : EventEmitter<User> = new EventEmitter<User>();

  constructor()
  {
    this.userslist = [];

    console.log('[my-users-list] constructor finished');
  }

  ngOnInit() {
    console.log('[my-users-list] ngOnInit finished');
  }

  /**
   * 'Select' button has been clicked, an user is selected. Send an event to the parent component
   *
   * @param user
   */
  onSelectClicked(user : User)
  {
    console.log('[my-users-list] Selecting user: ', user);

    this.selectedUserEvent.emit(user);
  }

  /**
   * * 'Delete' button has been clicked, the user will be deleted. Send an event to the parent component
   *
   * @param user
   */
  onDeleteClicked(user : User)
  {
    console.log('[my-users-list] Deleting user: ', user);

    this.deleteUserEvent.emit(user);
  }

}
