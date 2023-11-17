import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventArrangement } from '../models/eventArrangement'
import { ArrangementService } from '../services/arrangement.service';
import { Arrangement } from '../models/arrangement';

@Component({
  selector: 'app-arrangement-event',
  templateUrl: './event-arrangement.component.html',
  styleUrls: ['./event-arrangement.component.scss']
})
export class EventArrangementComponent implements OnInit {
  @Input()
  editMode: boolean = true;
  @Input()
  event?: EventArrangement;
  @Output()
  save = new EventEmitter<Arrangement>();

  ngOnInit(): void {
    if(!this.event) {
      this.event = { arrangementType: 'event' } as any;
    }
  }

  enableEditMode() {
    this.editMode = true
  }

  onSave() {
    this.event.title = 'event';
    this.save.emit(this.event);
    this.editMode = false
  }

  calculateDuration() {

  }
}
