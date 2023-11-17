import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodArrangement } from '../models/foodArrangement';
import { ArrangementService } from '../services/arrangement.service';
import { Arrangement } from '../models/arrangement';
import { MealPreference } from '../models/mealPreference';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-arrangement-food',
  templateUrl: './food-arrangement.component.html',
  styleUrls: ['./food-arrangement.component.scss']
})
export class FoodArrangementComponent {
  @Input()
  editMode: boolean = true;
  @Input()
  food?: FoodArrangement;
  @Output()
  save = new EventEmitter<Arrangement>();
  isAddPreference = false;
  preferenceList: MealPreference[];

  constructor(private helperService: HelperService) {
   
  }

  ngOnInit(): void {
    if(!this.food) {
      this.food = { arrangementType: 'food' } as any;
    }

    this.helperService.preferenceList$.subscribe((data)=>{
      this.preferenceList = data;
    });
  }

  enableEditMode() {
    this.editMode = true
  }

  addPreference() {
    this.isAddPreference = true;
  }

  onSave() {
    this.food.preferenceDetails = this.preferenceList.splice(0, this.preferenceList.length - 1);
    this.save.emit(this.food);
    this.editMode = false
  }

}
