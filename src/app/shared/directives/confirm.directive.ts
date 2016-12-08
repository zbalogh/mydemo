import {Directive, Input, HostListener} from "@angular/core";

@Directive({
  selector: '[confirm]'
})
/**
 * It is an attribute directive. Add it to an DOM element if you want confirm when clicking on the DOM element.
 */
export class ConfirmDirective {

    @Input('confirm')
    onConfirmed : Function;

    @Input('component')
    component : any;

    @Input('data')
    data : any = {};

    @Input('active')
    needConfirmation : boolean = true;

    @Input('confirmMessage')
    confirmMessage : string = 'Are you sure you want to do this?';

    constructor()
    {
        // callback function is initialized with empty code (nothing to do)
        // the real callback function is coming as input parameter
        this.onConfirmed = () => {};
    }

    /**
     * add listener on the host DOM element (where this directive is used)
     * we are listening for click event.
     */
    @HostListener('click', ['$event'])
    confirmFirst()
    {
        let confirmed = true;

        if (this.needConfirmation) {
          // display confirm dialog
          confirmed = window.confirm(this.confirmMessage);
        }

        // if confirm is "yes" then execute the given callback function
        if (confirmed) {
            this.onConfirmed(this.component, this.data);
        }
    }

}
