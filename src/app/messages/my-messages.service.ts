import {Injectable} from "@angular/core";
import {Message} from "./message.model";

@Injectable()
export class MyMessagesService {

  constructor()
  {
    console.log('[MyMessagesService] initialized the service');
  }

  public getAllMessages() : Message[]
  {
    let messages = [];

    return messages;
  }

}
