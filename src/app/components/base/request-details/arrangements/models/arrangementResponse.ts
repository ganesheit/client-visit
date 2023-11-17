import { EventArrangement } from "./eventArrangement";
import { FoodArrangement } from "./foodArrangement";
import { VehicleArrangement } from "./vehicleArrangement";

export interface ArrangementResponse {
    date: string;
    arrangement: Arrangements;
}

export class Arrangements {
    vehicleDetails: VehicleArrangement[];
    foodDetails: FoodArrangement[];
    eventDetails: EventArrangement[];
}

export type ArrangementRequest = VehicleArrangement | FoodArrangement | EventArrangement;