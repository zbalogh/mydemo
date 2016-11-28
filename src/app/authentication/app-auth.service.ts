import {Injectable} from "@angular/core";

/**
 * Authentication Service used by the application to authenticate user, and check if user is authenticated or not.
 */
@Injectable()
export class MyAuthenticationService {

  constructor() {
  }

  login(user: string, password: string): boolean
  {
    if (user === 'admin' && password === '12345') {
      // store logged user in the local browser storage (HTML5 feature)
      localStorage.setItem('username', user);

      // login success, so return true
      return true;
    }

    // if login failed then return true
    return false;
  }

  logout(): any
  {
    localStorage.removeItem('username');
  }

  getUser(): any
  {
    return localStorage.getItem('username');
  }

  isAuthenticated(): boolean
  {
    return this.getUser() !== null;
  }

}
