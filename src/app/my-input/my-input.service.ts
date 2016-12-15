import {Injectable} from "@angular/core";

@Injectable()
export class MyInputService {

  // collect names in this array
  names = [];

  // default suggestions list
  suggestions : string[] = [
    "John Smith",
    "Mary Spencer",
    "Steve Jobs",
    "Bernard Müller",
    "Zoltan Balogh",
    "Karoly Kovacs"
  ];

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

  /**
   * filter the name suggestions, and return the filtered result
   *
   * @param filter
   * @returns {string[]}
   */
  public filterNameSuggestions(filter : string) : string[]
  {
    let result : string[] = [];

    for (let name of this.suggestions) {
      // filter the suggestions list
      if (filter == null || filter == '') {
        result.push(name);
      }
      else {
        if ( name.toLowerCase().indexOf(filter.toLowerCase()) != -1 ) {
          result.push(name);
        }
      }
    }

    return result;
  }

}
