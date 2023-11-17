import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ParticipantService } from "src/app/services/participant.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-client-details",
  templateUrl: "./add-client-details.dialog.html",
  styleUrls: ["./add-client-details.dialog.scss"],
})
export class AddClientDetailsDialog {
  isSaveButtonDisabled: boolean = true;
  clientVisitId: string;
  participantForm: FormGroup;
  isArrivalFlightDetailsAdded: boolean;
  isDepartureFlightDetailsAdded: boolean;
  isHotelDetailsAdded: boolean;
  editArrivalFlightDetails: boolean;
  editDepartureFlightDetails: boolean;
  editHotelDetails: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      clientVisitId: string;
      action: string;
      participantData: any;
    },
    private fb: FormBuilder,
    private participantService: ParticipantService,
    private toaster: ToastrService
  ) {
    this.participantForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      expertise: [""],
      department: [""],
      email: ["", [Validators.required, Validators.email]],
      linkedInProfile: [""],
      company: [""],
      mobileNo: ["", [Validators.required, Validators.pattern("^\\d{10}$")]],
      age: ["", Validators.pattern("^\\d+$")],
      address: ["", Validators.required],
      comments: [""],
    });
    this.clientVisitId = this.data.clientVisitId;
    if (this.data.action === "edit") {
      this.updateParticipantForm();
    }
  }

  addFormGroup(formGroupName: string) {
    if (!this.participantForm.get(formGroupName)) {
      let newFormGroup: FormGroup;

      if (formGroupName === "arrivalFlightDetails") {
        newFormGroup = this.fb.group({
          arrivalDate: [""],
          flightNo: [""],
          // originCity: [""],
          origin: [""],
          carrier: [""],
          comments: [""],
        });
        this.isArrivalFlightDetailsAdded = true;
      } else if (formGroupName === "departureFlightDetails") {
        newFormGroup = this.fb.group({
          departureDate: [""],
          flightNo: [""],
          // destinationCity: [""],
          destination: [""],
          carrier: [""],
          comments: [""],
        });
        this.isDepartureFlightDetailsAdded = true;
      } else if (formGroupName === "hotelDetails") {
        newFormGroup = this.fb.group({
          name: [""],
          contactNo: [""],
          fromDate: [""],
          toDate: [""],
          address: [""],
          comments: [""],
        });
        this.isHotelDetailsAdded = true;
      }
      this.participantForm.addControl(formGroupName, newFormGroup);
    }
  }

  removeFormGroup(formGroupName: string) {
    this.participantForm.removeControl(formGroupName);
    if (formGroupName === "arrivalFlightDetails") {
      this.isArrivalFlightDetailsAdded = false;
    } else if (formGroupName === "departureFlightDetails") {
      this.isDepartureFlightDetailsAdded = false;
    } else if (formGroupName === "hotelDetails") {
      this.isHotelDetailsAdded = false;
    }
  }

  createParticipant() {
    if (this.participantForm.valid) {
      const participantDetails = this.processDates(this.participantForm.value);
      if (this.data.action === "add") {
        this.participantService
          .createParticipant(participantDetails, this.clientVisitId)
          .subscribe(
            (response) => {
              this.toaster.success(
                "Client detail added successfully",
                "Success",
                {
                  positionClass: "toast-center",
                }
              );
            },
            (error) => {
              this.toaster.error("Error in saving client details!!", "Error", {
                positionClass: "toast-center",
              });
            }
          );
      } else {
        const participantId = this.data.participantData.id;
        const updatedFormValue = this.participantForm.value;

        this.participantService
          .updateParticipant(participantId, updatedFormValue)
          .subscribe(
            (response) => {
              this.toaster.success(
                "Client details updated successfully",
                "Success",
                {
                  positionClass: "toast-center",
                }
              );
            },
            (error) => {
              this.toaster.error(
                "Client details cannot be updated at the moment!!",
                "Error",
                {
                  positionClass: "toast-center",
                }
              );
            }
          );
      }
    }
  }

  updateParticipantForm() {
    this.participantForm.patchValue(this.data.participantData);
    if (this.data.participantData.arrivalFlightDetails) {
      this.editArrivalFlightDetails = true;
      this.patchNestedFormGroup(
        "arrivalFlightDetails",
        this.data.participantData.arrivalFlightDetails
      );
    }

    if (this.data.participantData.departureFlightDetails) {
      this.editDepartureFlightDetails = true;
      this.patchNestedFormGroup(
        "departureFlightDetails",
        this.data.participantData.departureFlightDetails
      );
    }

    if (this.data.participantData.hotelDetails) {
      this.editHotelDetails = true;
      this.patchNestedFormGroup(
        "hotelDetails",
        this.data.participantData.hotelDetails
      );
    }
  }

  private patchNestedFormGroup(formGroupName: string, formData: any) {
    if (this.participantForm.get(formGroupName)) {
      this.participantForm.get(formGroupName).patchValue(formData);
    } else {
      this.participantForm.addControl(formGroupName, this.fb.group(formData));
    }
  }

  processDates(data: any) {
    const processedData = { ...data };
    if (processedData.hotelDetails && processedData.hotelDetails.fromDate) {
      processedData.hotelDetails.fromDate = this.changeISTDateTime(
        processedData.hotelDetails.fromDate
      );
    }

    if (processedData.hotelDetails && processedData.hotelDetails.toDate) {
      processedData.hotelDetails.toDate = this.changeISTDateTime(
        processedData.hotelDetails.toDate
      );
    }

    return processedData;
  }

  changeISTDateTime(date: any) {
    const localDate = new Date(date);
    const hours = localDate.getHours();
    const minutes = localDate.getMinutes();
    const newDate = new Date(localDate.setHours(hours + 5, minutes + 30));
    return newDate;
  }
}
