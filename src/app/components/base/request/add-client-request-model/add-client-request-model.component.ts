import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { ReplaySubject, pairwise, startWith, take, takeUntil } from "rxjs";
import { ClientVisitService } from "src/app/services/client-visit.service";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-add-client-request-model",
  templateUrl: "./add-client-request-model.component.html",
  styleUrls: ["./add-client-request-model.component.scss"],
})
export class AddClientRequestModelComponent implements OnInit {
  countries: { label: string, value: string }[] = [];
  states: { label: string, value: string }[] = [];
  cities: { label: string, value: string }[] = [];
  locations = [];

  requestForm: FormGroup;
  selectedCountry: string;
  selectedState: string;
  selectedAreas: string[] = [];

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private clientVisitService: ClientVisitService,
    private commonServices: CommonService,
    private dialogRef: MatDialogRef<AddClientRequestModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.requestForm = this.fb.group({
      id: [""],
      clientName: ["", Validators.required],
      countryName: ["", Validators.required],
      state: ["", Validators.required],
      region: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      primaryVisitCoordinators: ["", Validators.required],
      secondaryVisitCoordinators: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.commonServices.getLocations().pipe(take(1)).subscribe({
      next: (locations) =>  {
        this.countries = locations.map(location => location.name);
        this.locations = locations;
        this.updateDropdowns(); 
        this.requestForm.patchValue(this.data['request']);
      }
    });  
  }

  updateDropdowns() {
    this.requestForm.valueChanges.pipe(
      startWith(this.requestForm.getRawValue()),
      takeUntil(this.destroyed$),
      pairwise()
    ).subscribe({
      next: ([previous, current]) => {
        if(current['countryName'] !== previous['countryName']) {
          if(current['countryName']){
            const countryObj = this.locations.find(location => location.name === current['countryName']);
            this.states = countryObj['states'].map(state => state.name);
            if(this.states.length === 0) {
              this.requestForm.get('state').clearValidators();
              this.requestForm.get('region').clearValidators();
            } else {
              this.requestForm.get('state').setValidators(Validators.required);
              this.requestForm.get('region').setValidators(Validators.required);
            }
          } else {
            this.states = [];
          }
          if(this.states.indexOf(this.requestForm.get('state').value) === -1) {
            this.requestForm.get('state').setValue('');
          }
        }

        if(current['state'] !== previous['state']) { 
          if(current['state']) {
            const countryObj = this.locations.find(location => location.name === this.requestForm.get('countryName').value);
            const stateObj = countryObj['states'].find(state => state.name === current['state']);
            this.cities = stateObj['cities'].map(city => city.name );
            if(this.cities.length === 0) {
              this.requestForm.get('region').clearValidators();
            } else {
              this.requestForm.get('region').setValidators(Validators.required);
            }
          } else {
            this.cities = [];
          }
          if(this.cities.indexOf(this.requestForm.get('region').value) === -1) {
            this.requestForm.get('region').setValue('');
          }
        }
      }
    })
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
