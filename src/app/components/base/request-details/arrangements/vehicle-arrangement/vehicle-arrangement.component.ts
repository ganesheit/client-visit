import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VehicleArrangement } from '../models/vehicleArrangement';
import { ArrangementService } from '../services/arrangement.service';
import { Arrangement } from '../models/arrangement';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-arrangement-vehicle',
  templateUrl: './vehicle-arrangement.component.html',
  styleUrls: ['./vehicle-arrangement.component.scss']
})
export class VehicleArrangementComponent {
  @Input()
  editMode: boolean = true;
  @Input()
  vehicle?: VehicleArrangement;
  @Output()
  save = new EventEmitter<Arrangement>();
  form: FormGroup = new FormGroup({
    pickupPlace: new FormControl(),
    dropPlace: new FormControl(),
    pickupTime: new FormControl(),
    primaryCoordinator: new FormControl(),
    secondaryCoordinator: new FormControl(),
    model: new FormControl(),
    vehicleNo: new FormControl(),
    status: new FormControl()
  });

  ngOnInit(): void {
    if(!this.vehicle) {
      this.vehicle = { arrangementType: 'vehicle' } as any;
    }
  }

  enableEditMode() {
    this.editMode = true
  }

  onSave() {
    this.save.emit(this.vehicle);
    this.editMode = false
  }
}
