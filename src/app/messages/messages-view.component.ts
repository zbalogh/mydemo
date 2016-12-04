import {Component, OnInit} from "@angular/core";
import {MyMessagesService} from "./my-messages.service";
import {Message} from "./message.model";

@Component({
  selector : 'messages-view',

  template : `
      <br>
      <div align="center">
        <h1>Message Center</h1>
        
        <div align="center" class="row col-sm-2">
            <search-input placeholder="Search for messages" (onSearchEvent)="onSearchMessages($event)"></search-input>
        </div>
        <br><br>
        
        <div align="center" class="row col-sm-10">
           <messages-list [messages]="messageList" (deleteMessage)="onDeleteMessage($event)"></messages-list>
        </div>
        <br>
        
      </div>
`
})
export class MessagesViewComponent implements OnInit {

  // stores the current entered search value
  searchTerm : string = '';

  // list of users which will be shown
  messageList : Message[];


  /**
   * constructor of this view
   *
   * @param messageService
   */
  constructor(private messageService : MyMessagesService)
  {
    // init with empty array
    this.messageList = [];

    console.log('[messages-view] constructor finished');
  }

  ngOnInit(): void
  {
    // get all messages from service
    this.getAllMessages();

    console.log('[messages-view] ngOnInit finished');
  }


  /**
   * when search value entered on the search-field
   *
   * @param term
   */
  onSearchMessages(term : string)
  {
    console.log('[messages-view] search input value: ' + term);

    this.searchTerm = term;

    this.findMessages(this.searchTerm);
  }

  /**
   * find messages by the given search term
   *
   * @param term
   * @returns {Message[]}
   */
  private findMessages(term : string) : void
  {
      this.messageList = this.messageService.findMessages(term);
  }

  /**
   * get all messages
   *
   * @returns {Message[]}
   */
  private getAllMessages() : void
  {
      this.findMessages('');
  }

  onDeleteMessage(msg : Message) : void
  {
    console.log('[messages-view] deleting message: ', msg);
  }

}
