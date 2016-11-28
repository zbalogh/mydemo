import { Component } from '@angular/core';
import {MyAuthenticationService} from "./authentication/app-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * the main/root application component which will be started up (bootstrapped) by Angular2 framework.
 * see the main.ts and app.module.ts files where we declared the bootstrap stuff.
 */
export class AppComponent {

  constructor(private myAuthService : MyAuthenticationService) {

  }

  /**
   * Get the label for Authentication link at the navigation bar
   *
   * @returns {any}
   */
  get authenticationLinkLabel() : string
  {
      if (this.myAuthService.isAuthenticated()) {
          return "Logout";
      }
      else {
          return "Login";
      }
  }

}
