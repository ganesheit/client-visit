import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Arrangement } from '../models/arrangement';

@Component({
  selector: 'app-add-arrangement',
  templateUrl: './add-arrangement-model.component.html',
  styleUrls: ['./add-arrangement-model.component.scss']
})
export class AddArrangementModelComponent {
  type: string;
  @Output()
  submitClicked = new EventEmitter<Arrangement>;

  save(arrangement: Arrangement) {
    this.submitClicked.emit(arrangement);
  }
  onSelect(value: string) {
    this.type = value;
  }
}
