import {Injectable} from "@angular/core";
import {User} from "./user.model";
import {Http, URLSearchParams, Response} from "@angular/http";
import {Observable} from "rxjs";
import {xhrHeaders} from "../utils/xhr-headers";

@Injectable()
export class MyUsersService {

  /**
   * constructor with dependency injection for Angular HTTP service
   *
   * @param http
   */
  constructor(private http: Http)
  {
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

}
