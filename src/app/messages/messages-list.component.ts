import {OnInit, Component, Input, EventEmitter, Output} from "@angular/core";
import {Message} from "./message.model";

@Component({
  selector : 'messages-list',

  template : `
          <table align="center" class="table table-hover table-bordered table-striped">
              <thead>
                <tr>
                    <th class="cursor-pointer" (click)="sortListByColumn('id')">#ID</th>
                    <th class="cursor-pointer" (click)="sortListByColumn('subject')">Subject</th>
                    <th class="cursor-pointer" (click)="sortListByColumn('sender')">Sender</th>
                    <th class="cursor-pointer" (click)="sortListByColumn('datetime')">Date</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let msg of messageList | orderBy : orderByColumns">
                    <td>{{msg['id']}}</td>
                    <td>{{msg['subject']}}</td>
                    <td>{{msg['sender']}}</td>
                    <td>{{msg['datetime']}}</td>
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

  @Input('orderByColumns')
  orderByColumns : string[] = ['+datetime'];   // initialized with default orderBy definitions

  @Output('deleteMessage')
  deleteMessageEvent : EventEmitter<Message> = new EventEmitter<Message>();

  /*
   * stores the actual/current column 'id' which is used for sorting when click on a column in the table header
   */
  private currentSortByColumnId : string = '';

  /*
   * stores the current/actual sort direction. Initialize with ASC direction
   */
  private currentSortDirectionAscending : boolean = true;

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

  /**
   * handler method when Delete link is clicked. Send event to the parent with the selected item.
   *
   * @param msg
   */
  onDeleteClicked(msg : Message) : void
  {
    console.log('[messages-list] sending delete message event: ', msg);

    this.deleteMessageEvent.emit(msg);
  }

  /**
   * handler method to sort list by the given column.
   *
   * @param columnId
   */
  sortListByColumn(columnId : string) : void
  {
    let direction = '';

    if (columnId == this.currentSortByColumnId) {
      // same column clicked as last time, so just change the direction of sorting
      this.currentSortDirectionAscending = !this.currentSortDirectionAscending;
    }
    else {
      // different column is clicked, then order by this column with ascending
      this.currentSortDirectionAscending = true;
    }

    this.currentSortByColumnId = columnId;

    if (this.currentSortDirectionAscending) {
      direction = '+';
    }
    else {
      direction = '-';
    }

    // let's build up the orderBy definition as array which is used by 'orderBy' pipe
    this.orderByColumns = [ direction + columnId ];
  }

}
