import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { BaseComponent } from './components/base/base.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RequestDetailsComponent } from './components/base/request-details/request-details.component';
import { ClientDetailsComponent } from './components/base/request-details/client-details/client-details.component';
import { AgendaComponent } from './components/base/request-details/agenda/agenda.component';
import { ArrangementsComponent } from './components/base/request-details/arrangements/arrangements.component';
import { ReportComponent } from './components/base/request-details/report/report.component';
import { RequestComponent } from './components/base/request/request.component';
import { AddClientDetailsDialog } from './components/base/request-details/client-details/add-client-details/add-client-details.dialog';
import { AddAgendaDialog } from './components/base/request-details/agenda/add-agenda/add-agenda.dialog';
import { VehicleArrangementComponent } from './components/base/request-details/arrangements/vehicle-arrangement/vehicle-arrangement.component';
import { FoodArrangementComponent } from './components/base/request-details/arrangements/food-arrangement/food-arrangement.component';
import { EventArrangementComponent } from './components/base/request-details/arrangements/event-arrangement/event-arrangement.component';
import { FoodPreferenceComponent } from './components/base/request-details/arrangements/food-arrangement/food-preference/food-preference.component';
import { EventItemComponent } from './components/base/request-details/arrangements/event-arrangement/event-items/event-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddArrangementModelComponent } from './components/base/request-details/arrangements/add-arrangement-model/add-arrangement-model.component';
import { ArrangementService } from './components/base/request-details/arrangements/services/arrangement.service';
import { AddClientRequestModelComponent } from './components/base/request/add-client-request-model/add-client-request-model.component';
import { ToastrModule } from 'ngx-toastr';
import { ClientRequestDeleteConfirmModel } from './components/base/request/client-request-delete-confirm/client-request-delete-confirm.model';
import { ViewDetailModalComponent } from './components/shared/view-detail-modal/view-detail-modal.component';
import { NGX_MAT_DATE_FORMATS, NgxMatDateFormats } from '@angular-material-components/datetime-picker';
import { HelperService } from './components/base/request-details/arrangements/services/helper.service';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LoginComponent,
    NavigationComponent,
    RequestDetailsComponent,
    ClientDetailsComponent,
    AgendaComponent,
    ArrangementsComponent,
    ReportComponent,
    RequestComponent,
    VehicleArrangementComponent,
    EventArrangementComponent,
    FoodArrangementComponent,
    FoodPreferenceComponent,
    AddClientDetailsDialog,
    EventItemComponent,
    AddAgendaDialog,
    AddArrangementModelComponent,
    AddClientRequestModelComponent,
    ClientRequestDeleteConfirmModel,
    ViewDetailModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NoopAnimationsModule
  ],
  providers: [ArrangementService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
