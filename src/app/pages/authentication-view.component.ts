import {Component} from "@angular/core";
import {MyAuthenticationService} from "../authentication/app-auth.service";
import {Router} from "@angular/router";

@Component({
  selector : 'app-auth',

  template : `
      <br>
      <div align="center">
      
        <div *ngIf="!authService.isAuthenticated()">
          <h1>Authentication required. Please login to the application.</h1>
        </div>
        
        <br>
        
        <!-- old style of alert -->
        <div class="alert alert-danger" role="alert" *ngIf="false">
          {{ message }}
        </div>
        <!-- new style of alert with ng2-bootstrap -->
        <ngb-alert *ngIf="message" type="danger" [dismissible]="false">{{ message }}</ngb-alert>

        <!-- if user is not authenticated then display the login form -->
        <form class="form-inline" *ngIf="!authService.isAuthenticated()">
            <div class="form-group">
                <label for="username">User:</label>
                <input class="form-control" name="username" #username>
            </div>
        
            <div class="form-group">
                <label for="password">Password:</label>
                <input class="form-control" type="password" name="password" #password>
            </div>
        
            <button type="submit" class="btn btn-success" (click)="login(username.value, password.value)">Login</button>
        </form>
      
        <!-- if user is authenticated then display the logout button -->
        <div class="well" *ngIf="authService.isAuthenticated()">
            You are logged in as <b>{{ authService.getUser() }}</b>
            <br><br>
            <button type="submit" class="btn btn-success" (click)="logout()">Click here to logout</button>
        </div>
                
      </div>
`
})
export class AuthenticationViewComponent {

  message: string;

  /**
   * constructor of this component. we inject the Angular Router and the authentication service
   */
  constructor(public router: Router, public authService: MyAuthenticationService)
  {
      this.message = '';
  }

  /**
   * login to the application
   *
   * @param username
   * @param password
   */
  login(username: string, password: string) : boolean
  {
      this.message = '';

      if (!this.authService.login(username, password))
      {
          // login failed, display message
          this.message = 'Incorrect credentials.';

          // set timeout to clear message after a few seconds
          setTimeout(function() {
            this.message = '';
          }.bind(this), 3000);
      }
      else {
          // login success
          // redirect the user the main/home page
          this.router.navigate(['/']);
      }

      return false;
  }

  /**
   * logout from the application
   */
  logout(): boolean
  {
      // let's logout
      this.authService.logout();

      // after logout redirect the browser to login page by full page reload
      //window.location.href = '/authentication';

      return false;
  }

}
