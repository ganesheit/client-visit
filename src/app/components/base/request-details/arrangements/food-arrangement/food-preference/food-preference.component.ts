import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { defaultPreference } from '../../models/preferences';
import { NgForm } from '@angular/forms';
import { HelperService } from '../../services/helper.service';
import { MealPreference } from '../../models/mealPreference';

@Component({
  selector: 'arrangement-preference-food',
  templateUrl: './food-preference.component.html',
  styleUrls: ['./food-preference.component.scss']
})
export class FoodPreferenceComponent {
  @Input()
  editMode: boolean = true;
  @Input()
  parentEditMode: boolean;

  preference: MealPreference = defaultPreference;
  preferences: MealPreference[] = [defaultPreference];
  @ViewChild('preferenceForm') preferenceForm: NgForm;

  constructor(private helperService: HelperService) { }

  savePreferences() {
    this.helperService.updatePreferenceList(this.preferences);
    this.preferences.forEach((elem) => {
      elem.editMode = false;
    });
      this.preferences.push({
        type: '',
        menu: '',
        totalMembers: null,
        comments: '',
        editMode: true
      });
  }

  editPreference(prefer: MealPreference, index) {
    prefer.editMode = true;
    if (this.preferences[index + 1].totalMembers === null) {
      this.preferences.splice(this.preferences.length - 1, 1);
    }
  }

  deletePreference(index: number) {
    this.preferences.splice(index, 1);
    if (this.preferences.length === 0) {
      this.preferences.push(defaultPreference);
    }
  }
}
