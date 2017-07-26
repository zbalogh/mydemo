import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {MyAuthenticationService} from "./app-auth.service";

/**
 * A simple Login/Authentication Guard service which is used by routing configuration
 */
@Injectable()
export class MyAuthenticationGuard implements CanActivate, CanActivateChild {

  constructor (private router: Router, private myAuthService : MyAuthenticationService) {
  }

  /**
   * It is called before the Angular Router tries to route the given page/component which was requested in the URL.
   * It returns true if access to the page is allowed, otherwise redirect to the login page.
   *
   * @param route
   * @param state
   * @returns {boolean}
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
      if (this.myAuthService.isAuthenticated()) {
          // user is authenticated, enable to render the requested page/component
          return true;
      }
      else {
          // user not logged in, redirect to the login page
          this.router.navigate(['/authentication']);
          return false;
      }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    return this.canActivate(route, state);
  }


}
