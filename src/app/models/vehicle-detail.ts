export interface VehicleDetail {
    _id: number;
    pickup_place: string;
    drop_place: string;
    pickup_time: Date;
    model: string;
    passengers_count: number;
    comments: string;
    vehicle_no: string;
    status: string;
    created_time: Date;
    updated_time: Date;
  }