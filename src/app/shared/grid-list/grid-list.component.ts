import {OnInit, Component, Input, EventEmitter, Output} from "@angular/core";
import {GridListColumn} from "./grid-list-column.model";

@Component({
  selector : 'grid-list',

  template : `
          <table align="center" class="table table-hover table-bordered table-striped">
              <thead>
                <tr>
                    <th *ngFor="let col of columns" class="cursor-pointer" (click)="sortListByColumn(col['id'])">{{ col['label'] }}</th>
                    
                    <th *ngIf="showSelectButton || showDeleteButton">&nbsp;</th>
                </tr>
            </thead>
            
            <tbody>
                <tr *ngFor="let item of dataList | orderBy : orderByColumns">
                    
                    <td *ngFor="let col of columns">{{ showItemValueForColumn(item, col) }}</td>
                    
                    <td *ngIf="showSelectButton || showDeleteButton" nowrap>
                        <div *ngIf="showSelectButton" class="btn btn-link" (click)="onSelectClicked(item)"><b>Select</b></div>
                        <span *ngIf="showSelectButton && showDeleteButton">&nbsp;|&nbsp;</span>
                        <div *ngIf="showDeleteButton" class="btn btn-link" [confirm]="onDeleteConfirmed" [component]="this" [data]="item" [active]="confirmDelete" [confirmMessage]="deleteConfirmMessage"><b>Delete</b></div>
                     </td>
                </tr>
            </tbody>
          </table>
`
})

// (click)="onDeleteClicked(item)"

/**
 * An universal grid-list component to show list of data in a table
 */
export class GridListComponent implements OnInit {

  // required input
  @Input('columns')
  columns : GridListColumn[];

  // required input
  @Input('data')
  dataList : any[];

  // required input
  @Input('orderByColumns')
  orderByColumns : string[];

  // optional input
  @Input('showSelectButton')
  showSelectButton : boolean = true;

  // optional input
  @Input('showDeleteButton')
  showDeleteButton : boolean = true;

  // optional input
  @Input('confirmDelete')
  confirmDelete : boolean = true;

  @Output('selectItem')
  selectItemEvent : EventEmitter<any> = new EventEmitter<any>();

  @Output('deleteItem')
  deleteItemEvent : EventEmitter<any> = new EventEmitter<any>();

  // confirm message for delete operation
  deleteConfirmMessage : string = "Are you sure you want to delete this item?";

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
    this.dataList = [];
    this.columns = [];
    console.log('[grid-list] constructor finished');
  }

  ngOnInit(): void
  {
    console.log('[grid-list] ngOnInit finished');
  }

  /**
   * Handler method when Select link is clicked. Send event to the parent with the selected item.
   *
   * @param item
   */
  onSelectClicked(item : any)
  {
    console.log('[grid-list] sending SelectItem event: ', item);

    this.selectItemEvent.emit(item);
  }

  /**
   * handler method when Delete link is clicked. Send event to the parent with the deleting item.
   *
   * @param msg
   */
  onDeleteClicked(item : any) : void
  {
    console.log('[grid-list] sending deleteItem event: ', item);

    this.deleteItemEvent.emit(item);
  }

  /**
   * callback method which is used for 'confirm' directive.
   * the directive executes this method with 'component' and 'data' parameters
   * which are specified in the template.
   *
   * @param component
   * @param item
   */
  onDeleteConfirmed(component : GridListComponent, data : any)
  {
      component.onDeleteClicked(data);
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

  showItemValueForColumn(item: any, col : any) : string
  {
      // get the column ID
      let property = col['id'];

      // get value from the item by the column ID
      let value = item[property];

      return value;
  }

}
