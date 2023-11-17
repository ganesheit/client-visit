import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MealPreference } from "../models/mealPreference";

@Injectable({
    providedIn: 'root',
})
export class HelperService {

    public preferenceSubject$: BehaviorSubject<any[]> = this.createBehaviourSubject();
    public preferenceList$ = this.preferenceSubject$.asObservable();

    createBehaviourSubject() {
         return new BehaviorSubject<MealPreference[]>([]);
    }

    updatePreferenceList(preference: MealPreference[]) {
        this.preferenceSubject$.next(preference);
    }

}