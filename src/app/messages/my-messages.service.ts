import {Injectable} from "@angular/core";
import {Message} from "./message.model";
import {MESSAGE_DATA} from "../data/messages-data";

@Injectable()
export class MyMessagesService {

  private messages : Message[];

  constructor()
  {
    console.log('[MyMessagesService] initialized the service');

    this.messages = MESSAGE_DATA;
  }

  /**
   * It returns array of messages which matches the given search term.
   *
   * @returns {Array}
   */
  public findMessages(term : string) : Message[]
  {
    let result = [];

    for (let message of this.messages) {
        // if no filter then add message
        if (term == null || term == '') {
            result.push(message);
        }
        else {
            // filtering the result by the given 'term'
            let match : boolean = false;

            if (message.id != null && message.id.toLowerCase().indexOf(term.toLowerCase()) != -1) {
                match = true;
            }

            if (message.subject != null && message.subject.toLowerCase().indexOf(term.toLowerCase()) != -1) {
                match = true;
            }

            if (message.sender != null && message.sender.toLowerCase().indexOf(term.toLowerCase()) != -1) {
                match = true;
            }

            if (message.datetime != null && message.datetime.toLowerCase().indexOf(term.toLowerCase()) != -1) {
                match = true;
            }

            if (match) {
                result.push(message);
            }
        }
    }

    return result;
  }

  /**
   * Delete the given message
   *
   * @param message
   */
  public deleteMessage(message : Message) : void
  {
      // get index for the given message in the array
      let index = this.messages.indexOf(message);

      // remove the message object from array
      this.messages.splice(index, 1);
  }

}
