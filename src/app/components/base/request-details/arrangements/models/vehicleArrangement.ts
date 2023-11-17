import { Arrangement } from "./arrangement";

export interface VehicleArrangement extends Arrangement {
    pickupPlace: string;
    dropPlace: string;
    pickupTime: string;
    model: string;
    vehicleNo: string;
    driverMobileNumber?: number;
    passengersCount?: number;
    comments: string;
    createdTime: string;
    udpatedTime: string;
}