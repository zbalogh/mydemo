import {UserRoleItem} from "./user-role.model";
/**
 * A simple model bean represents an user object
 */
export class User {

  constructor() {}

  id : number = 0;

  userid : string  = "";

  firstname : string  = "";

  lastname : string  = "";

  email : string  = "";

  telephone : string = "";

  mobile : string = "";

  company : string = "";

  department : string = "";

  assignedRoles  : UserRoleItem[] = [];

}
