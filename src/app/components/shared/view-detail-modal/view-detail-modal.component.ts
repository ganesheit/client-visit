import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-view-detail-modal",
  templateUrl: "./view-detail-modal.component.html",
  styleUrls: ["./view-detail-modal.component.scss"],
})
export class ViewDetailModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public participantData: any) {}

hasValues(obj: any): boolean {
  return Object.keys(obj).some(key => !!obj[key]);
}

hasHotelDetails(): boolean {
  return this.participantData?.hotelDetails && this.hasValues(this.participantData.hotelDetails);
}

hasFlightDetails(): boolean {
  return (
    (this.participantData?.arrivalFlightDetails && this.hasValues(this.participantData.arrivalFlightDetails)) ||
    (this.participantData?.departureFlightDetails && this.hasValues(this.participantData.departureFlightDetails))
  );
}

}
