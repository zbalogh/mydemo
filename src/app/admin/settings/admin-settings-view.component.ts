import {Component} from "@angular/core";

@Component({
  selector : 'admin-settings-view',

  template : `
          <br>
          <div align="center">
            <h1>Your account settings</h1>
            
            <p-tabView>
                <p-tabPanel header="Basic" leftIcon="fa-address-book">
                    Here you can configure your basic settings, like: firstname, lastname, email, birthday, etc.    
                </p-tabPanel>
                <p-tabPanel header="Change Password" leftIcon="fa-lock">
                    Here you have a possibility to change your password.
                </p-tabPanel>
                <p-tabPanel header="Change Email" leftIcon="fa-bookmark-o">
                    Here you have a possibility to change your email address.
                </p-tabPanel>
            </p-tabView>

            
          </div>
`
})
export class AdminSettingsViewComponent {

}
