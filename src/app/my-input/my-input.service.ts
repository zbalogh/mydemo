import {Injectable} from "@angular/core";

@Injectable()
export class MyInputService {

  names = [];

  /**
   * Saving the given value
   *
   * @param value
   */
  public save(value)
  {
    console.log('saving the entered value: ' + value);

    this.names.push(value);
  }

  /**
   * return the names array
   *
   * @returns {Array}
   */
  public getNames()
  {
    return this.names;
  }

  public removeNames()
  {
    this.names = [];
  }

}
