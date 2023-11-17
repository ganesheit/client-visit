import { Arrangement } from "./arrangement";
import { MealPreference } from "./mealPreference";

export interface FoodArrangement extends Arrangement {
    mealType: string;
    mealTime: string;
    preferenceDetails: MealPreference[];
}