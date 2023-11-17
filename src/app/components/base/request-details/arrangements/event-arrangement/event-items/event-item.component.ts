import { Component, Input } from '@angular/core';
import { EventItem } from '../../models/eventItem';

@Component({
  selector: 'arrangement-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent {
  @Input()
  editMode: boolean = true;
  @Input()
  parentEditMode: boolean;
  @Input()
  item: EventItem
}
