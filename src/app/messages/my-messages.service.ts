import {Injectable} from "@angular/core";
import {Message} from "./message.model";

@Injectable()
export class MyMessagesService {

  constructor()
  {
    console.log('[MyMessagesService] initialized the service');
  }

  /**
   * It returns array of messages which matches the given search term.
   *
   * @returns {Array}
   */
  public getAllMessages(term : string) : Message[]
  {
    let messages = [];

    //TODO: implement it!

    return messages;
  }

}
