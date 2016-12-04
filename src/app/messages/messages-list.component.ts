import {OnInit, Component, Input, EventEmitter, Output} from "@angular/core";
import {Message} from "./message.model";

@Component({
  selector : 'messages-list',

  template : `
          <table align="center" class="table table-hover table-bordered table-striped">
              <thead>
                <tr>
                    <th>#ID</th>
                    <th>Subject</th>
                    <th>Sender</th>
                    <th>Date</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let msg of messageList">
                    <td>{{msg.id}}</td>
                    <td>{{msg.subject}}</td>
                    <td>{{msg.sender}}</td>
                    <td>{{msg.datetime}}</td>
                    <td nowrap>
                        <div class="btn btn-link" (click)="onDeleteClicked(msg)"><b>Delete</b></div>
                     </td>
                </tr>
            </tbody>
          </table>
`
})
export class MessagesListComponent implements OnInit {

  @Input('messages')
  messageList : Message[];

  @Output('deleteMessage')
  deleteMessageEvent : EventEmitter<Message> = new EventEmitter<Message>();

  /**
   * constructor of this component
   */
  constructor()
  {
    // initialize with empty array
    this.messageList = [];

    console.log('[messages-list] constructor finished');
  }

  ngOnInit(): void
  {
    console.log('[messages-list] ngOnInit finished');
  }

  onDeleteClicked(msg : Message) : void
  {
    console.log('[messages-list] sending delete message event: ', msg);

    this.deleteMessageEvent.emit(msg);
  }

}
