import {Injectable} from "@angular/core";
import {User} from "./user.model";
import {Http, URLSearchParams, Response} from "@angular/http";
import {Observable} from "rxjs";
import {xhrHeaders} from "../utils/xhr-headers";
import {SelectItem} from "primeng/components/common/api";
import {UserRoleItem} from "./user-role.model";

@Injectable()
export class MyUsersService {

  // list of departments which will be used for the dropdown component
  private departmentList : SelectItem[];

  // all user roles which will be used for PickList component
  private userRoles : UserRoleItem[];

  /**
   * constructor with dependency injection for Angular HTTP service
   *
   * @param http
   */
  constructor(private http: Http)
  {
    // initialize department array with data
    this.departmentList = [];
    this.departmentList.push({label: 'None', value: ''});
    this.departmentList.push({label: 'Accounting', value: 'Accounting'});
    this.departmentList.push({label: 'Development', value: 'Development'});
    this.departmentList.push({label: 'Logistics', value: 'Logistics'});
    this.departmentList.push({label: 'Sales', value: 'Sales'});

    // initialize roles array
    this.userRoles = [];
    this.userRoles.push({ label: "Administrator", value: "administrator" });
    this.userRoles.push({ label: "Standard User", value: "standard_user" });
    this.userRoles.push({ label: "Restricted User", value: "restricted_user" });
    this.userRoles.push({ label: "Guest", value: "guest" });

    console.log('[MyUsersService] initialized with HTTP service');
  }

  /**
   * find users by the given search term
   *
   * @param term
   * @returns {Observable<User>}
   */
  public findUsers(term : string) : Observable<User[]>
  {
    console.log(`searching users by search term: ${term}`);

    let params : URLSearchParams = new URLSearchParams();
    params.set('term', term);

    return this.http.get('/api' + '/users', {search:params}).map( (res : Response) => res.json() );
  }

  public getUserById(id : number) : Observable<User>
  {
    console.log('getting user by id=' + id);

    return this.http.get('/api' + '/users/' + id, xhrHeaders()).map( (res: Response) => res.json() );
  }

  /**
   * add a new user
   *
   * @param newUser
   * @returns {User}
   */
  public addUser(newUser : User) : Observable<User>
  {
      return this.http.post('/api' + '/users', JSON.stringify(newUser), xhrHeaders()).map( (res : Response) => res.json() );
  }

  /**
   * update the given user
   *
   * @param updatedUser
   * @returns {User}
   */
  public updateUser(updatedUser : User) : Observable<User>
  {
    return this.http.put('/api' + '/users', JSON.stringify(updatedUser), xhrHeaders()).map( (res : Response) => res.json() );
  }

  /**
   * delete the given user
   *
   * @param deletedUser
   * @returns {User}
   */
  public deleteUser(deletedUser : User) : Observable<Response>
  {
      return this.http.delete('/api' + '/users/' + deletedUser.id);
  }

  /**
   * get list of departments
   *
   * @returns {SelectItem[]}
   */
  public getDepartmentList() : SelectItem[]
  {
    let list = this.departmentList;

    // create an empty result array
    let result = [];

    // iterate all department and put into the result array
    for (let dep of list) {
      result.push(dep);
    }
    // no we have another reference which independent of the service array
    // return this array as result
    return result;
  }

  /**
   * get list of all user roles
   *
   * @returns {UserRoleItem[]}
   */
  public getAllUserRoles() : UserRoleItem[]
  {
    let list = this.userRoles;

    // create an empty result array
    let result = [];

    // iterate all roles and put into the result array
    for (let role of list) {
      result.push(role);
    }

    // no we have another reference which independent of the service array
    // return this array as result
    return result;
  }

  public getAvailableUserRoles(user : User) : UserRoleItem[]
  {
    // get list of available roles from the service
    let allRoles = this.getAllUserRoles();

    // create available roles which only contains the NOT assigned roles
    return this.buildAssignedRolesArray(allRoles, user.assignedRoles);
  }

  /**
   * after receiving the user object with assigned roles, we remove those items from available
   * which are already assigned to the user, so we really just show the NOT assigned (available) roles
   */
  private buildAssignedRolesArray(allRoles, userAssignedRoles) : UserRoleItem[]
  {
    // collect here the available (not assigned) roles
    // this will be used for pick-list on the GUI
    let availableRolesArray = [];

    // iterate the all roles array
    for (let role of allRoles) {

      // a boolean flag, set to true if role is member of the user assigned role
      let found = false;

      for (let asr of userAssignedRoles) {

        if (role.value == asr.value) {
          // this role exists in the user assigned role
          // set the 'found' flag to true and finish the loop
          found = true;
          break;
        }
      }

      if (!found) {
        // role is not found, so add it into the 'availableRolesArray'
        availableRolesArray.push(role);
      }
    }

    // OK, we collected the available (not assigned) roles
    return availableRolesArray;
  }

}
